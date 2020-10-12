// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.7.0;

// pragma experimental ABIEncoderV2;

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

        // bool claimed;
    }

    mapping(bytes32 => Order) orders;

    IOracle private oracle;
    IERC20Token private underlying;

    uint256 private issued;
    address private marketMaker;

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
    
    // function buyToOpen(

    // ) public {
    //     address seller,
    // }
    
    function claim(
        uint256 expiryBlock,
        OptType t,
        uint256 strike
    ) public payable { // https://programtheblockchain.com/posts/2017/12/15/writing-a-contract-that-handles-ether/
        Order storage o = orders[keccak256(
            abi.encodePacked("TOK", expiryBlock, t, strike)
        )];

        require(o.asset.claimBlock < block.number, "contract is not active");

        require(oracle.priceAtBlock(block.number) /* 22 */ > strike, "the token price needs to be in the money");

        require(
            msg.value > o.quantity * strike,
            "insufficient funds for settle"
        );

        // NOTE: https://github.com/ConsenSys/smart-contract-best-practices/blob/master/docs/recommendations.md#handle-errors-in-external-calls
        bool success = underlying.transferFrom(marketMaker, msg.sender, o.quantity);

        require(success, "transfer failed");

        // https://solidity.readthedocs.io/en/v0.7.2/050-breaking-changes.html#semantic-and-syntactic-changes
        // https://ethereum.stackexchange.com/questions/64567/unused-variables-warning-in-address-call-return-tuple-bool-bytes-memory
    }

    // TODO: Add a function to allow the market maker to withdraw funds

    function withdraw() public { // https://github.com/ConsenSys/smart-contract-best-practices/blob/master/docs/recommendations.md#dont-use-transfer-or-send
        msg.sender.transfer(address(this).balance);
    }
}
