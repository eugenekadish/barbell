// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.7.0;

contract Oracle {
    address private underlying;

    constructor(address uAddress) {
        underlying = uAddress;
    }

    function priceAtBlock(uint256 blockNumber) public view returns (uint256) {
        return (uint256(blockhash(blockNumber)) % 10) + 1 + 22;
    }
}
