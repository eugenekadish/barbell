// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.7.0;

import "../assetts/Token.sol";

import "../interfaces/IOracle.sol";
import "../interfaces/IERC20Token.sol";

contract Option {

    enum OptType {C, P}

    struct Vault {
        uint256 expiry;
        uint256 amount;
    }

    mapping(address => Vault) balances;

    struct Asset {
        uint256 claimBlock;
        uint256 expiryBlock;
        
        uint256 strike;
    }

    struct Order {
        address buyer;
        address seller;
        
        uint256 price;
        uint256 quantity;
        
        Asset asset;
    }

    mapping(bytes32 => Order) orders;

    IOracle private oracle;
    IERC20Token private underlying;

    uint256 private issued;
    address payable private marketMaker;

    constructor(address uAddress, address oAddress) {
        marketMaker = msg.sender;

        oracle = IOracle(oAddress);
        underlying = IERC20Token(uAddress);
    }

    function issue(
        address buyer,
        uint256 expiryBlock,
        OptType t,
        uint256 strike,
        uint256 price,
        uint256 quantity
    ) public {
        issued = issued + 10 * quantity;

        require(
            expiryBlock > block.number,
            "insufficient contract duration"
        );

        require(
            underlying.allowance(marketMaker, address(this)) > issued,
            "insufficient underlying reserve to issue more tokens"
        );

        // TODO: Additional logic can be used to offset calls and Puts at the
        // same strike price.

        Asset memory a = Asset(block.number, expiryBlock, strike);
        Order memory o = Order(buyer, msg.sender, price, quantity, a);

        orders[keccak256(abi.encodePacked("TOK", expiryBlock, t, strike))] = o;
    }

    // https://ethereum.stackexchange.com/questions/45277/calling-one-contract-to-another-contract-method
    // https://ethereum.stackexchange.com/questions/64567/unused-variables-warning-in-address-call-return-tuple-bool-bytes-memory

    function claim(
        uint256 expiryBlock,
        OptType t,
        uint256 strike
    ) public payable { // https://programtheblockchain.com/posts/2017/12/15/writing-a-contract-that-handles-ether
        Order storage o = orders[keccak256(
            abi.encodePacked("TOK", expiryBlock, t, strike)
        )];

        require(o.asset.claimBlock < block.number, "contract is not active");

        require(oracle.priceAtBlock(block.number) > strike, "the token price needs to be in the money");

        require(
            msg.value > o.quantity * strike, // TODO: Send the difference back to the buyer
            "insufficient funds to settle"
        );

        bool success = underlying.transferFrom(marketMaker, msg.sender, o.quantity);

        require(success, "transfer failed");

        // https://solidity.readthedocs.io/en/v0.7.2/050-breaking-changes.html#semantic-and-syntactic-changes
        // https://ethereum.stackexchange.com/questions/64567/unused-variables-warning-in-address-call-return-tuple-bool-bytes-memory

        msg.sender.transfer(msg.value - o.quantity * strike);
    }

    function withdraw() public {
        marketMaker.transfer(address(this).balance);
    }
}
