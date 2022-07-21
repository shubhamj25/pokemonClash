// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface NowggNFTInterface {
    function registerPlayerCards(address player, uint256 quantity) external;
}

interface IdentityNftInterface {
    function mint(address _to) external payable returns (bool);

    function balanceOf(address user) external returns (uint256);
}

interface NowggFTInterface {
    function mint(address to, uint256 amount) external returns (bool);

    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);

    function transfer(address to, uint256 amount) external returns (bool);
}

contract NowggMarketPlace {
    NowggFTInterface token;
    IdentityNftInterface identityToken;
    NowggNFTInterface nowggNFT;
    address admin;

    constructor(
        address nowggFTAddress,
        address nowggNFTAddress,
        address identityTokenAddress,
        address adminAddress
    ) {
        token = NowggFTInterface(nowggFTAddress);
        nowggNFT = NowggNFTInterface(nowggNFTAddress);
        identityToken = IdentityNftInterface(identityTokenAddress);
        admin = adminAddress;
    }

    // if identity nft exists, then user is authenticated.
    // todo: error handling needs to be done
    function registerUser() public {
        if (identityToken.balanceOf(msg.sender) == 0) {
            // mint the NFT and assign it to the user.
            identityToken.mint(msg.sender);
            token.mint(msg.sender, 10000);
            nowggNFT.registerPlayerCards(msg.sender, 10);
        }
    }

    function purchaseCards() public {
        require(
            token.allowance(msg.sender, address(this)) >= 5000,
            "Insufficient Allowance"
        );
        token.transferFrom(msg.sender, address(this), 5000);
        token.transfer(admin, 5000);
        nowggNFT.registerPlayerCards(msg.sender, 5);
    }

    function addCurrency(uint256 amount) public {
        token.mint(msg.sender, amount);
    }
}
