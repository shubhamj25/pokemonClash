// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

interface WhitelistInterface{
    function isMember(address _member) external view returns (bool);
}

contract NowggFT is ERC20 {
    address admin;
    WhitelistInterface whitelist;

    constructor(address whitelistContract) ERC20("NowggFT", "GM") {
        admin = msg.sender;
        whitelist = WhitelistInterface(whitelistContract);
    }

    function mint(address to, uint256 amount) public virtual returns (bool) {
        require(
            whitelist.isMember(msg.sender),
            "Only Nowgg Marketplace can mint."
        );

        _mint(to, amount);
        return true;
    }
}
