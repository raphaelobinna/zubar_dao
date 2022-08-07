// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;


import "@openzeppelin/contracts/governance/TimelockController.sol";

contract Timelock is TimelockController {
    constructor(
        uint256 mintDelay,
        address[] memory proposers, 
        address[] memory executors
    ) TimelockController(mintDelay, proposers, executors) {}
}
