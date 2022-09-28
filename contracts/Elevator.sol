// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface BuildingInterface {
    function isLastFloor(uint256) external returns (bool);
}

contract Elevator {
    bool public top;
    uint256 public floor;

    function goTo(uint256 _floor) public {
        BuildingInterface building = BuildingInterface(msg.sender);
        if (!building.isLastFloor(_floor)) {
            floor = _floor;
            top = building.isLastFloor(floor);
        }
    }
}
