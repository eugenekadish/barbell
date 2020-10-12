// SPDX-License-Identifier: MIT

pragma solidity ^0.7.0;

contract Oracle {
    address private underlying;

    constructor(address _underlying) {
        underlying = _underlying;
        // underlying = Token(_underlying)
    }

    // function priceAtBlock() public pure returns (uint256) {
    //     return 22;
    // }

    function priceAtBlock(uint256 blockNumber) public view returns (uint256) {
        // require(blockNumber < block.number, "unknown price of future block");

        return 22;
        // return (uint256(blockhash(blockNumber)) % 10) + 1;
    }
}
