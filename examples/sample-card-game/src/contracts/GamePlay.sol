// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./PokemonNft.sol";

interface PokemonNftInterface{
    struct Pokemon {
        uint256 id;
        string name;
        string[2] pokemonType;
        string image;
        uint8 hp;
        uint8 attack;
        uint8 defense;
        uint8 spAttack;
        uint8 spDefense;
        uint8 speed;
    }
  function getPokemonMetaData(uint256 token) external view returns (Pokemon memory);
  function ownerOf(uint256 token) external view returns (address);
}

contract GamePlay {
    PokemonNftInterface pokemonNftContract;
    constructor(address nftContract) {
        pokemonNftContract = PokemonNftInterface(nftContract);
    }

    uint256 public playerCount = 0;
    struct Pokemon {
        uint256 id;
        string name;
        string[2] pokemonType;
        string image;
        uint8 hp;
        uint8 attack;
        uint8 defense;
        uint8 spAttack;
        uint8 spDefense;
        uint8 speed;
    }
    uint256 randNonce = 0;

    function randMod(uint256 _modulus) public returns (uint256) {
        randNonce++;
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.timestamp, msg.sender, randNonce)
                )
            ) % _modulus;
    }
    function getStatByIndex(uint index,PokemonNftInterface.Pokemon memory _pokemon) private pure returns(uint8){
        if(index==0){
            return _pokemon.hp;
        }else if(index==1){
            return _pokemon.attack;
        }else if(index==2){
            return _pokemon.defense;
        }else if(index==3){
            return _pokemon.spAttack;
        }else if(index==4){
            return _pokemon.spDefense;
        }else{
            return _pokemon.speed;
        }
    } 

    struct Player {
        uint256 id;
        uint256[] nfts;
        address walletAddress;
        uint256 exposedStat;
        uint256 exposedNft;
        uint256 points;
        address connectedTo;
        address winner;
    }
    mapping(address => Player) public globalPlayerState;
    mapping(uint256 => address) public playerIdToAddress;

    Player public _player;

    event OpponentFound(address from, address to);

    event OpponentNotFound(address from, address to);

    function findOpponent() public {
        if (
            globalPlayerState[msg.sender].connectedTo == address(0) &&
            playerCount > 1
        ) {
            for (uint256 n = 1; n <= playerCount; n++) {
                if (
                    globalPlayerState[playerIdToAddress[n]].connectedTo ==
                    address(0) &&
                    globalPlayerState[msg.sender].walletAddress !=
                    globalPlayerState[playerIdToAddress[n]].walletAddress
                ) {
                    uint256 stat = randMod(6);
                    globalPlayerState[playerIdToAddress[n]].connectedTo = msg
                        .sender;
                    globalPlayerState[playerIdToAddress[n]].exposedStat = stat + 1;
                    globalPlayerState[msg.sender]
                        .connectedTo = playerIdToAddress[n];
                    globalPlayerState[msg.sender].exposedStat = stat + 1;
                    emit OpponentFound(msg.sender, playerIdToAddress[n]);
                    break;
                }
            }
        } else {
            emit OpponentNotFound(msg.sender, msg.sender);
        }
    }

    event ResultDeclared(address from, address to, string message);

    function finishAndDeclareWinner() public {
        if (globalPlayerState[msg.sender].connectedTo == address(0)) {
            emit ResultDeclared(
                msg.sender,
                msg.sender,
                "You are not playing with anyone! Find an opponent first!"
            );
        }
        if (
            globalPlayerState[msg.sender].points ==
            globalPlayerState[globalPlayerState[msg.sender].connectedTo]
                .points
        ) {
            emit ResultDeclared(
                msg.sender,
                msg.sender,
                "Cannot declare winner ,one of the player must have lesser cards than other. Play a few more chances !!"
            );
        } else if (
            globalPlayerState[msg.sender].points >
            globalPlayerState[globalPlayerState[msg.sender].connectedTo]
                .points
        ) {
            globalPlayerState[msg.sender].winner = globalPlayerState[msg.sender]
                .walletAddress;
            globalPlayerState[globalPlayerState[msg.sender].connectedTo]
                .winner = globalPlayerState[msg.sender].walletAddress;
            emit ResultDeclared(
                msg.sender,
                globalPlayerState[msg.sender].connectedTo,
                "Winner Declared"
            );
        } else {
            globalPlayerState[msg.sender].winner = globalPlayerState[msg.sender]
                .connectedTo;
            globalPlayerState[globalPlayerState[msg.sender].connectedTo]
                .winner = globalPlayerState[msg.sender].connectedTo;
            emit ResultDeclared(
                msg.sender,
                globalPlayerState[globalPlayerState[msg.sender].connectedTo]
                    .walletAddress,
                "Winner Declared"
            );
        }
    }

    function initPlayerCards(uint256[] calldata ownedNfts) public returns (uint256[] memory) {
        playerCount++;
        delete _player.nfts;
        _player.id = playerCount;
        for (uint256 i = 0; i < 5; i++) {
            uint n = randMod(10);
           _player.nfts.push(ownedNfts[n]);
        }
        _player.walletAddress = msg.sender;
        globalPlayerState[msg.sender] = _player;
        playerIdToAddress[playerCount] = msg.sender;
        return globalPlayerState[msg.sender].nfts;
    }

    function getGlobalPlayerState() public view returns (Player memory) {
        return globalPlayerState[msg.sender];
    }

    event CardsReadyForTally(address from, address to);

    function exposeCardForTally(uint256 token,uint stat)
        public
        returns (uint)
    {
        globalPlayerState[msg.sender].exposedNft = token;
        globalPlayerState[msg.sender].exposedStat = stat;
        globalPlayerState[globalPlayerState[msg.sender].connectedTo].exposedStat = stat;
        if (
            globalPlayerState[msg.sender].connectedTo != address(0) &&
            globalPlayerState[globalPlayerState[msg.sender].connectedTo]
                .exposedNft != 0
        ) {
            emit CardsReadyForTally(
                msg.sender,
                globalPlayerState[msg.sender].connectedTo
            );
        }
        return token;
    }

    event GameRefreshed(address from, address to);
  function refreshGame() public {
        delete globalPlayerState[msg.sender].nfts;
        delete globalPlayerState[globalPlayerState[msg.sender].connectedTo]
            .nfts;
        delete globalPlayerState[msg.sender].exposedNft;
        delete globalPlayerState[msg.sender].exposedStat;
        delete globalPlayerState[globalPlayerState[msg.sender].connectedTo]
            .exposedNft;
        delete globalPlayerState[globalPlayerState[msg.sender].connectedTo].exposedStat;
        delete globalPlayerState[msg.sender].winner;
        delete globalPlayerState[globalPlayerState[msg.sender].connectedTo]
            .winner;
        globalPlayerState[msg.sender].points = 0;
        globalPlayerState[globalPlayerState[msg.sender].connectedTo].points = 0;
        emit GameRefreshed(
            msg.sender,
            globalPlayerState[msg.sender].connectedTo
        );
    }

    event Disconnected(address from, address to);

    function disconnect() public {
        address tmp = globalPlayerState[msg.sender].connectedTo;
        globalPlayerState[msg.sender].connectedTo = address(0);
        globalPlayerState[tmp].connectedTo = address(0);
        globalPlayerState[msg.sender].points = 0;
        globalPlayerState[tmp].points = 0;
        emit Disconnected(msg.sender, tmp);
    }

    function remove(uint256 index, address a) public {
        globalPlayerState[a].nfts[index] = globalPlayerState[a].nfts[
            globalPlayerState[a].nfts.length - 1
        ];
        delete globalPlayerState[a].nfts[
            globalPlayerState[a].nfts.length - 1
        ];
        globalPlayerState[a].nfts.pop();
    }

    event CardTransfered(address from, address to);

    function tallyAndTransferCards(uint256 tokenA, uint256 tokenB) public {
        PokemonNftInterface.Pokemon memory p1= pokemonNftContract.getPokemonMetaData(tokenA);
        PokemonNftInterface.Pokemon memory p2= pokemonNftContract.getPokemonMetaData(tokenB);
        uint8 statA = getStatByIndex(globalPlayerState[pokemonNftContract.ownerOf(tokenA)].exposedStat,p1);
        uint8 statB = getStatByIndex(globalPlayerState[pokemonNftContract.ownerOf(tokenB)].exposedStat,p2);
        if(statA == statB) {
            globalPlayerState[pokemonNftContract.ownerOf(tokenA)].points++;
            globalPlayerState[pokemonNftContract.ownerOf(tokenB)].points++;
        }
        else if(statA > statB){
            globalPlayerState[pokemonNftContract.ownerOf(tokenA)].points++;
        }
        else {
            globalPlayerState[pokemonNftContract.ownerOf(tokenB)].points++;
        }
        deleteFromAnB(tokenA,tokenB);
        if (
            globalPlayerState[msg.sender].nfts.length == 0 ||
            globalPlayerState[globalPlayerState[msg.sender].connectedTo]
                .nfts
                .length ==
            0
        ) {
            finishAndDeclareWinner();
        }
    }

    function deleteFromAnB(uint256 tokenA, uint256 tokenB) internal {
        for (uint256 i = 0; i < globalPlayerState[pokemonNftContract.ownerOf(tokenA)].nfts.length; i++) {
            if (
                globalPlayerState[pokemonNftContract.ownerOf(tokenA)].nfts[i] == tokenA
            ) {
                remove(i, pokemonNftContract.ownerOf(tokenA));
                break;
            }
        }
        for (uint256 i = 0; i < globalPlayerState[pokemonNftContract.ownerOf(tokenB)].nfts.length; i++) {
            if (
                globalPlayerState[pokemonNftContract.ownerOf(tokenB)].nfts[i]==tokenB
            ) {
                remove(i, pokemonNftContract.ownerOf(tokenB));
                break;
            }
        }
        delete globalPlayerState[pokemonNftContract.ownerOf(tokenA)].exposedNft;
        delete globalPlayerState[pokemonNftContract.ownerOf(tokenB)].exposedNft;
        emit CardTransfered(
            msg.sender,
            globalPlayerState[msg.sender].connectedTo
        );
    }
}