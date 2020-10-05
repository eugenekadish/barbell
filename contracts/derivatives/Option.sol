// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

// pragma experimental ABIEncoderV2;

import "../assetts/Token.sol";
import "../utilities/Oracle.sol";
import "../interfaces/IERC20Token.sol";

contract Option {
    // TODO: Keep a seperate list of all the contracts. The market maker can
    // periodically go through delete all the worthless contracts and settle
    // the delegates with the underlying.

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

    // address public underlying;

    Oracle private oracle;
    IERC20Token private underlying;

    address payable private marketMaker;

    uint256 issued;

    // * Function with owner address that can buy tokens
    // * Admin needs to have bought tokens ahead of time

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
        uint256 claimBlock = block.number + 10;

        require(
            expiryBlock - claimBlock > 28,
            "insufficient contract duration"
        );

        require(
            underlying.balanceOf(address(this)) > issued,
            "insufficient underlying reserve to issue more tokens"
        );

        // TODO: Additional logic can be used to offset calls and Puts at the
        // same strike price.

        Asset memory a = Asset(claimBlock, expiryBlock, strike);
        Order memory o = Order(buyer, msg.sender, price, quantity, a);

        orders[keccak256(abi.encodePacked("TOK", expiryBlock, t, strike))] = o;
    }

    function claim(
        uint256 expiryBlock,
        OptType t,
        uint256 strike
    ) public payable {
        // provided all conditions are satisfied (in the money, etc.) pay the
        // market maker and transfer ether from the buyer to the market maker

        Order storage o = orders[keccak256(
            abi.encodePacked("TOK", expiryBlock, t, strike)
        )];

        require(o.asset.claimBlock < block.number, "contract is not active");

        require(
            underlying.balanceOf(address(this)) > o.quantity,
            "insufficient balance of the underlying"
        );

        require(
            msg.value > o.quantity * strike,
            "insufficient funds for settle"
        );

        require(
            underlying.transferFrom(address(this), msg.sender, 100),
            "transfer failed"
        );

        marketMaker.transfer(o.quantity * strike);
    }

    // function buyToOpen(
    //     uint256 expiryBlock,
    //     OptType t,
    //     uint256 strike,
    //     uint256 quantity
    // ) public {
    //     Order storage o = orders[keccak256(
    //         abi.encodePacked("TOK", expiryBlock, t, strike)
    //     )];

    //     require(o.asset.claimBlock < block.number, "contract is not active");

    //     require(
    //         underlying.balanceOf(address(this)) > o.quantity,
    //         "insufficient balance of the underlying"
    //     );

    //     require(
    //         msg.value > o.quantity * o.price,
    //         "insufficient funds for settle"
    //     );

    //     marketMaker.transfer(o.quantity * o.price);
    // }

    // function sellToClose(uint _amount, uint _expiry) public {

    //     //

    //     // balances[msg.sender]
    // }

    // function settlePut(uint expiryBlock, uint strikePrice) public returns (bool) {

    //     Transfer t = pending[sha3(abi.encodePacked("TOK", expiryBlock, OptType.P, strikePrice))];

    //     require(t.expiryBlock == expiryBlock, "wrong contract");

    //     uint sp = oracle.priceAtBlock(expiryBlock);

    //     require(t.strikePrice < sp, "contract is worthless");

    //     msg.sender.transfer(t.numContracts * strikePrice) // TODO: Check if this succeeds
    // }

    // function settleCall(uint expiryBlock, uint strikePrice) {

    //     // TODO: Call Oracle to get token price at a specified block

    //     Transfer t = pending[sha3(abi.encodePacked("TOK", expiryBlock, OptType.C, strikePrice))];

    //     require(condition);

    //     // TODO: Check the option expired

    //     // TODO: Check the strike price was correct at the time of expiration

    //     // TODO: Transfer tokens from the contract to the buyer
    // }

    // function approve(address delegate, uint numOpts, uint strike, uint expiryBlock) public returns (bool) {

    //     uint minBlock = block.number + 10;

    //     require(expiryBlock - minBlock > 28, "insuffecient contract duration");
    //     require(numTokens <= balances[msg.sender], "sender has insufficient funds");

    //     // TODO: Check this contract owns enough of the underlying

    //     pending[delegate] = Transfer(msg.sender, minBlock, expiryBlock, strike, numOpts)
    // }

    // function settle() public {

    //     // * msg.value = strike * _amount

    //     // transfer the number of tokens in the sender's vault to the user's address
    // }

    // function addUnderlying() public {

    //     // user ERC20 interfase and transfer
    // }
}
