pragma solidity ^0.5.0;

contract Oracle {
    address private underlying;

    constructor(address _underlying) public {
        underlying = _underlying;
        // underlying = Token(_underlying)
    }

    function priceAtBlock(uint256 blockNumber) public view returns (uint256) {
        require(blockNumber < block.number, "unknown price of future block");

        return (uint256(blockhash(blockNumber)) % 10) + 1;
    }
}
