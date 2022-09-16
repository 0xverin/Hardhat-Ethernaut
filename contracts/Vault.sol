// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;
import "hardhat/console.sol";

contract Vault {
    bool public locked;
    bytes32 private password;

    constructor(bytes32 _password) public {
        locked = true;
        password = _password;
        console.logBytes32(password);
    }

    function unlock(bytes32 _password) public {
        if (password == _password) {
            locked = false;
        }
    }
}
