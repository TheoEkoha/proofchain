// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ProofchainSBT is ERC721, Ownable {
    mapping(uint256 => bool) private _revoked;

    mapping(uint256 => string) private _tokenMetadata;

    uint256 private _currentTokenId;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        _currentTokenId = 0;
    }

    function mint(address to, string memory metadataJSON) public onlyOwner {
        uint256 tokenId = _currentTokenId;
        _safeMint(to, tokenId);
        _tokenMetadata[tokenId] = metadataJSON;
        _currentTokenId++;
    }

    function revoke(uint256 tokenId) public {
        require(_exists(tokenId), "ProofchainSBT: Token does not exist");
        require(
            ownerOf(tokenId) == msg.sender || owner() == msg.sender,
            "ProofchainSBT: Only token owner or contract owner can revoke"
        );

        _burn(tokenId);
        _revoked[tokenId] = true;
        delete _tokenMetadata[tokenId];
    }

    function deleteToken(uint256 tokenId) public onlyOwner {
        require(_exists(tokenId), "ProofchainSBT: Token does not exist");

        _burn(tokenId);
        _revoked[tokenId] = true;
        delete _tokenMetadata[tokenId];
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);

        require(
            from == address(0) || to == address(0),
            "ProofchainSBT: Transfers are not allowed"
        );
        require(!_revoked[tokenId], "ProofchainSBT: Token has been revoked");
    }

    function getTokenMetadata(
        uint256 tokenId
    ) public view returns (string memory) {
        return _tokenMetadata[tokenId];
    }

    function getCurrentTokenId() public view returns (uint256) {
        return _currentTokenId;
    }

    function getTokenState(uint256 tokenId) public view returns (bool exists, bool revoked) {
        exists = _exists(tokenId);
        revoked = _revoked[tokenId];
    }
}
