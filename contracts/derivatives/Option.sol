// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

// pragma experimental ABIEncoderV2;

import "../assetts/Token.sol";
import "../utilities/Oracle.sol";
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

    // address public underlying;

    Oracle private oracle;
    IERC20Token private underlying;

    uint256 private issued;
    address private marketMaker;


    constructor(address _underlying) {
        marketMaker = msg.sender;

        oracle = Oracle(_underlying);
        underlying = IERC20Token(_underlying);
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

        // require(
        //     underlying.allowance(marketMaker, address(this)) > issued,
        //     "insufficient underlying reserve to issue more tokens"
        // );

        require(
            msg.value == 1,
            // msg.value > o.quantity * strike,
            "insufficient funds for settle"
        );

        // NOTE: https://github.com/ConsenSys/smart-contract-best-practices/blob/master/docs/recommendations.md#handle-errors-in-external-calls
        bool success = underlying.transferFrom(marketMaker, msg.sender, o.quantity);

        require(success, "transfer failed");

        // https://solidity.readthedocs.io/en/v0.7.2/050-breaking-changes.html#semantic-and-syntactic-changes
        // https://ethereum.stackexchange.com/questions/64567/unused-variables-warning-in-address-call-return-tuple-bool-bytes-memory

        // (bool success, bytes memory res) = address(underlying).call(abi.encodeWithSignature("transferFrom(address, address, uint256) public returns (bool)", address(this), msg.sender, o.quantity));

        // uint(res)

        // require(
        //     success,
        //     "transfer failed"
        // );
    }

    // TODO: Add a function to allow the market maker to withdraw funds
}
