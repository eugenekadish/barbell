// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.7.0;

interface IOracle {
    function priceAtBlock(uint256 blockNumber) external view returns (uint256);
}
