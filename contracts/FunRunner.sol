// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.7.0;
// https://medium.com/@blockchain101/calling-the-function-of-another-contract-in-solidity-f9edfa921f4c

import "./SimpleStorage.sol";

contract FunRunner {
    SimpleStorage private s;

    constructor(address a) {
        s = SimpleStorage(a);
    }

    function set(uint256 x) public {
        s.set(x);
    }

    function get() public view returns (uint256) {
        return s.get();
    }

    function setAndGet(uint256 x) public {
        s.set(x);

        require(
            // x == s.get(),
            x == s.get(),
            "data was not updated"
        );
    }
}
