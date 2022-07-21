// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract IdentityNft is ERC721,ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    bool nonTransferableNonBurnable = true;

    constructor() ERC721("Identity_Nft", "IDENTITY") {}

    function mint(address _to) public payable returns (bool) {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        _mint(_to, tokenId);
        // doubt: set the token uri as a url?
        // can also be some concatenated string:
        // string(abi.encodePacked(tempURI, uintToString(newItemId)))
        //_setTokenURI(_tokenId, "Identity_NFT");
        return true;
    }

    //make this token non transferable non burnable
    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) public view override(IERC721,ERC721) {
        require(!nonTransferableNonBurnable, "This NFT is not trasferable");
    }

    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _tokenId,
        bytes memory _data
    ) public view override(IERC721,ERC721) {
        require(!nonTransferableNonBurnable, "This NFT is not trasferable");
    }

    function _burn(uint256 tokenId) internal virtual override(ERC721) {
        require(!nonTransferableNonBurnable, "This NFT is not burnable");
    }
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721,ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721,ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}