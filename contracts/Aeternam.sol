// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Aeternam is ERC20 {

    address internal _owner;
    /**
    * @notice 
    * We mint the initial supply to an owner, this supply will then be buyed by
    * all the people that will participate in the ICO.
     */
    constructor(address owner_, uint256 initialSupply_) ERC20("Aeternam", "AETER") {
         _owner = owner_;
        _mint(owner_, initialSupply_);
    }

    /**
    *@dev
    * This function is there to take track to whome we've sent the inital supply
    */

    function owner() public view returns(address) {
        return _owner;
    }
}