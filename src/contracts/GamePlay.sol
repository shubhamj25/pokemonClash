// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface NowggFTInterface {
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

interface NowggNFTInterface {
    struct Pokemon {
        uint256 id;
        string name;
        string[2] pokemonType;
        string image;
        uint256 hp;
        uint256 attack;
        uint256 defense;
        uint256 spAttack;
        uint256 spDefense;
        uint256 speed;
    }

    function getPokemonMetaData(uint256 token)
        external
        view
        returns (Pokemon memory);

    function ownerOf(uint256 token) external view returns (address);

    function balanceOf(address user) external view returns (uint256);
}

contract GamePlay {
    NowggNFTInterface nowggNftContract;
    NowggFTInterface nowggFtContract;
    address private owner;
    address adminAddress;
    uint256 entryFees = 1000;
    uint256 platformFeesPercent = 10;

    constructor(
        address nftContractAddress,
        address ftContractAddress,
        address admin
    ) {
        nowggNftContract = NowggNFTInterface(nftContractAddress);
        nowggFtContract = NowggFTInterface(ftContractAddress);
        owner = msg.sender;
        adminAddress = admin;
    }

    struct Player {
        bytes32[] encodedNfts;
        address walletAddress;
        uint256[] exposedNfts;
        uint256 points;
        uint256 gameRoomId;
        bool cardsVerified;
    }

    enum Status {
        WAITING,
        LIVE,
        COMPLETED
    }

    // define enum of  status
    enum Stat {
        NULL,
        HP,
        ATTACK,
        DEFENSE,
        SP_ATTACK,
        SP_DEFENSE,
        SPEED
    }

    enum RoundState {
        Player1Turn,
        Player2Turn,
        ResultDeclared
    }

    // function to generate random number (to be changed later for better security)
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

    struct RoundInfo {
        address player1;
        address player2;
        address winner;
        uint256 player1Card;
        uint256 player2Card;
        Stat exposedStat;
    }

    struct GameRoom {
        uint256 id;
        Status status;
        Player player1;
        Player player2;
        address winner;
        Stat currentExposedStat;
        uint256 roundNo;
        uint256 totalRounds;
        RoundState roundState;
        RoundInfo[] previousRoundInfo;
    }

    uint256 private gameRoomCount;
    uint256 private waitingGameRoomId;

    mapping(uint256 => GameRoom) private gameRoomMap;
    mapping(address => Player) private playerMap;

    function getPlayerData(address playerAddress)
        public
        view
        returns (Player memory)
    {
        return playerMap[playerAddress];
    }

    function _selectRandomCards(bytes32[] calldata cards)
        internal
        returns (bytes32[] memory)
    {
        bytes32[] memory selectedCards = new bytes32[](5);
        bytes32[] memory userCards = cards;
        uint256 backTrackCount = 0;
        for (uint256 i = 0; i < 5; i++) {
            uint256 selectedCardIndex = randMod(userCards.length);
            if (userCards[selectedCardIndex] == bytes32(0x00)) {
                if (backTrackCount < 10) {
                    i--;
                    backTrackCount++;
                } else break;
            } else {
                selectedCards[i] = cards[selectedCardIndex];
                delete userCards[selectedCardIndex];
            }
        }
        return selectedCards;
    }

    event PlayerTurn(
        address receiver,
        bool cardTobexposed,
        bool exposeStat,
        uint256 gameRoomId
    );

    function registerPlayer(bytes32[] calldata encodedCards) public {
        // do various validations
        require(nowggNftContract.balanceOf(msg.sender) > 5, "Nm");
        require(
            nowggFtContract.allowance(msg.sender, address(this)) >= 1000,
            "Nm"
        );
        nowggFtContract.transferFrom(msg.sender, address(this), 1000);
        // register player
        Player memory _player;
        _player.walletAddress = msg.sender;
        // select random cards and save them in encoded form
        _player.encodedNfts = _selectRandomCards(encodedCards);
        playerMap[msg.sender] = _player;
        // initialise game room
        if (waitingGameRoomId == 0) {
            gameRoomCount++;
            waitingGameRoomId = gameRoomCount;
            gameRoomMap[gameRoomCount].id = gameRoomCount;
            gameRoomMap[gameRoomCount].status = Status.WAITING;
            gameRoomMap[gameRoomCount].currentExposedStat = Stat.NULL;
            gameRoomMap[gameRoomCount].player1 = _player;
            gameRoomMap[gameRoomCount].totalRounds = 5;
            playerMap[msg.sender].gameRoomId = gameRoomCount;
        } else {
            gameRoomMap[waitingGameRoomId].player2 = _player;
            playerMap[msg.sender].gameRoomId = waitingGameRoomId;
            gameRoomMap[gameRoomCount].status = Status.LIVE;
            bool player1Turn = (randMod(2) == 0) ? true : false;
            gameRoomMap[waitingGameRoomId].roundState = player1Turn
                ? RoundState.Player1Turn
                : RoundState.Player2Turn;
            emit PlayerTurn(
                player1Turn
                    ? gameRoomMap[waitingGameRoomId].player1.walletAddress
                    : gameRoomMap[waitingGameRoomId].player2.walletAddress,
                true,
                true,
                waitingGameRoomId
            );
            waitingGameRoomId = 0;
        }
    }

    event GameEnded(address winner, address loser, Status status);

    function _distributePrizesAndEmitEndGame(uint256 gameRoomId, address winner)
        internal
    {
        uint256 platformCut = ((2 * entryFees * platformFeesPercent) / 100);
        uint256 winningAmount = (2 * entryFees - platformCut);
        if (winner == address(0)) {
            nowggFtContract.transfer(
                gameRoomMap[gameRoomId].player1.walletAddress,
                (winningAmount / 2)
            );
            nowggFtContract.transfer(
                gameRoomMap[gameRoomId].player2.walletAddress,
                (winningAmount / 2)
            );
        } else {
            nowggFtContract.transfer(winner, winningAmount);
        }
        nowggFtContract.transfer(adminAddress, platformCut);
        gameRoomMap[gameRoomId].status = Status.COMPLETED;
        gameRoomMap[gameRoomId].roundState = RoundState.ResultDeclared;
        gameRoomMap[gameRoomId].winner = winner;
        delete playerMap[gameRoomMap[gameRoomId].player1.walletAddress];
        delete playerMap[gameRoomMap[gameRoomId].player2.walletAddress];
        if (winner == address(0)) {
            emit GameEnded(
                gameRoomMap[gameRoomId].player1.walletAddress,
                gameRoomMap[gameRoomId].player1.walletAddress,
                gameRoomMap[gameRoomId].status
            );
            emit GameEnded(
                gameRoomMap[gameRoomId].player2.walletAddress,
                gameRoomMap[gameRoomId].player2.walletAddress,
                gameRoomMap[gameRoomId].status
            );
        } else {
            emit GameEnded(
                winner == gameRoomMap[gameRoomId].player1.walletAddress
                    ? gameRoomMap[gameRoomId].player1.walletAddress
                    : gameRoomMap[gameRoomId].player2.walletAddress,
                winner == gameRoomMap[gameRoomId].player1.walletAddress
                    ? gameRoomMap[gameRoomId].player2.walletAddress
                    : gameRoomMap[gameRoomId].player1.walletAddress,
                gameRoomMap[gameRoomId].status
            );
        }
    }

    /**
     *  triggered from front end when other player doesn't respond
     */
    function triggerEndMatch(uint256 gameRoomId, address playerAddress)
        public
        payable
    {
        require(
            (playerAddress == gameRoomMap[gameRoomId].player1.walletAddress ||
                playerAddress == gameRoomMap[gameRoomId].player2.walletAddress),
            "Nm"
        );
        if (gameRoomMap[gameRoomId].status == Status.WAITING) {
            nowggFtContract.transfer(playerAddress, entryFees);
            delete playerMap[playerAddress];
            waitingGameRoomId = 0;
        } else if (gameRoomMap[gameRoomId].status == Status.LIVE) {
            bool isPlayer1 = playerAddress ==
                gameRoomMap[gameRoomId].player1.walletAddress;
            if (isPlayer1) {
                _distributePrizesAndEmitEndGame(
                    gameRoomId,
                    gameRoomMap[gameRoomId].player2.walletAddress
                );
            } else
                _distributePrizesAndEmitEndGame(
                    gameRoomId,
                    gameRoomMap[gameRoomId].player1.walletAddress
                );
        }
        delete gameRoomMap[gameRoomId];
    }

    function checkMatchState(uint256 gameRoomId)
        public
        view
        returns (GameRoom memory)
    {
        // get the state of the match
        return gameRoomMap[gameRoomId];
    }

    function getStatByEnum(
        Stat _stat,
        NowggNFTInterface.Pokemon memory _pokemon
    ) private pure returns (uint256) {
        if (_stat == Stat.HP) {
            return _pokemon.hp;
        } else if (_stat == Stat.ATTACK) {
            return _pokemon.attack;
        } else if (_stat == Stat.DEFENSE) {
            return _pokemon.defense;
        } else if (_stat == Stat.SP_ATTACK) {
            return _pokemon.spAttack;
        } else if (_stat == Stat.SP_DEFENSE) {
            return _pokemon.spDefense;
        } else if (_stat == Stat.SPEED) {
            return _pokemon.speed;
        } else return 0;
    }

    function _processRound(uint256 gameRoomId) internal {
        RoundInfo memory _round = gameRoomMap[gameRoomId].previousRoundInfo[
            gameRoomMap[gameRoomId].roundNo
        ];
        NowggNFTInterface.Pokemon memory A = nowggNftContract
            .getPokemonMetaData(_round.player1Card);
        NowggNFTInterface.Pokemon memory B = nowggNftContract
            .getPokemonMetaData(_round.player2Card);
        // Compare cards and declare winner for that round
        if (
            getStatByEnum(gameRoomMap[gameRoomId].currentExposedStat, A) ==
            getStatByEnum(gameRoomMap[gameRoomId].currentExposedStat, B)
        ) {
            playerMap[_round.player1].points++;
            playerMap[_round.player2].points++;
            gameRoomMap[gameRoomId].player1.points++;
            gameRoomMap[gameRoomId].player2.points++;
            gameRoomMap[gameRoomId]
                .previousRoundInfo[gameRoomMap[gameRoomId].roundNo]
                .winner = randMod(2) == 0 ? _round.player1 : _round.player2;
        } else if (
            getStatByEnum(gameRoomMap[gameRoomId].currentExposedStat, A) >
            getStatByEnum(gameRoomMap[gameRoomId].currentExposedStat, B)
        ) {
            playerMap[_round.player1].points++;
            gameRoomMap[gameRoomId].player1.points++;
            gameRoomMap[gameRoomId]
                .previousRoundInfo[gameRoomMap[gameRoomId].roundNo]
                .winner = _round.player1;
        } else {
            playerMap[_round.player2].points++;
            gameRoomMap[gameRoomId].player2.points++;
            gameRoomMap[gameRoomId]
                .previousRoundInfo[gameRoomMap[gameRoomId].roundNo]
                .winner = _round.player2;
        }
        // TODO: If last round trigger verify cards event
        // For now skipping this step
        if (
            gameRoomMap[gameRoomId].roundNo ==
            (gameRoomMap[gameRoomId].totalRounds - 1)
        ) {
            bool sendToPlayer1 = randMod(2) == 0 ? true : false;
            emit VerifyCards(
                sendToPlayer1
                    ? gameRoomMap[gameRoomId].player1.walletAddress
                    : gameRoomMap[gameRoomId].player2.walletAddress,
                gameRoomId
            );
        }
        // else fire next round event
        else {
            gameRoomMap[gameRoomId].roundState = gameRoomMap[gameRoomId]
                .previousRoundInfo[gameRoomMap[gameRoomId].roundNo]
                .winner == gameRoomMap[gameRoomId].player1.walletAddress
                ? RoundState.Player1Turn
                : RoundState.Player2Turn;
            emit PlayerTurn(_round.winner, true, true, gameRoomId);
        }
        gameRoomMap[gameRoomId].currentExposedStat = Stat.NULL;
        gameRoomMap[gameRoomId].roundNo++;
    }

    event VerifyCards(address to, uint256 gameRoomId);

    function verifyPlayerCards(uint256 gameRoomId, uint256 blindingFactor)
        public
        returns (bool)
    {
        bool isPlayer1 = msg.sender ==
            gameRoomMap[gameRoomId].player1.walletAddress;
        uint256 verifiedRounds = 0;
        for (uint256 i = 0; i < gameRoomMap[gameRoomId].totalRounds; i++) {
            bool roundVerified = false;
            for (
                uint256 j = 0;
                j < playerMap[msg.sender].encodedNfts.length;
                j++
            ) {
                uint256 card = isPlayer1
                    ? gameRoomMap[gameRoomId].previousRoundInfo[i].player1Card
                    : gameRoomMap[gameRoomId].previousRoundInfo[i].player2Card;
                if (
                    keccak256(
                        abi.encodePacked(blindingFactor, card, msg.sender)
                    ) == playerMap[msg.sender].encodedNfts[j]
                ) {
                    roundVerified = true;
                    verifiedRounds++;
                    break;
                }
            }
            if (roundVerified == false) {
                _distributePrizesAndEmitEndGame(
                    gameRoomId,
                    isPlayer1
                        ? gameRoomMap[gameRoomId].player2.walletAddress
                        : gameRoomMap[gameRoomId].player1.walletAddress
                );
                return false;
            }
            if (verifiedRounds == gameRoomMap[gameRoomId].totalRounds) {
                if (isPlayer1) {
                    gameRoomMap[gameRoomId].player1.cardsVerified = true;
                } else {
                    gameRoomMap[gameRoomId].player2.cardsVerified = true;
                }
                bool bothPlayerCardsVerified = gameRoomMap[gameRoomId]
                    .player1
                    .cardsVerified &&
                    gameRoomMap[gameRoomId].player2.cardsVerified;
                if (bothPlayerCardsVerified) {
                    address winner;
                    if (
                        gameRoomMap[gameRoomId].player1.points >
                        gameRoomMap[gameRoomId].player2.points
                    ) {
                        winner = gameRoomMap[gameRoomId].player1.walletAddress;
                    } else if (
                        gameRoomMap[gameRoomId].player1.points <
                        gameRoomMap[gameRoomId].player2.points
                    ) {
                        winner = gameRoomMap[gameRoomId].player2.walletAddress;
                    } else {
                        winner = address(0);
                    }
                    _distributePrizesAndEmitEndGame(gameRoomId, winner);
                } else {
                    if (isPlayer1) {
                        emit VerifyCards(
                            gameRoomMap[gameRoomId].player2.walletAddress,
                            gameRoomId
                        );
                    } else {
                        emit VerifyCards(
                            gameRoomMap[gameRoomId].player1.walletAddress,
                            gameRoomId
                        );
                    }
                }
            }
        }
        return true;
    }

    function executeMove(
        uint256 cardTypeId,
        Stat exposedStat,
        uint256 gameRoomId
    ) public {
        // nftTypeId: charizard, HorsePower, 1
        // acknowledege and save move
        if (gameRoomMap[gameRoomId].currentExposedStat == Stat.NULL) {
            RoundInfo memory _currentRound;
            gameRoomMap[gameRoomId].previousRoundInfo.push(_currentRound);
        }
        if (gameRoomMap[gameRoomId].roundState == RoundState.Player1Turn) {
            gameRoomMap[gameRoomId]
                .previousRoundInfo[gameRoomMap[gameRoomId].roundNo]
                .player1 = msg.sender;
            gameRoomMap[gameRoomId]
                .previousRoundInfo[gameRoomMap[gameRoomId].roundNo]
                .player1Card = cardTypeId;
            gameRoomMap[gameRoomId]
                .previousRoundInfo[gameRoomMap[gameRoomId].roundNo]
                .exposedStat = exposedStat;
            gameRoomMap[gameRoomId].player1.exposedNfts.push(cardTypeId);
        } else if (
            gameRoomMap[gameRoomId].roundState == RoundState.Player2Turn
        ) {
            gameRoomMap[gameRoomId]
                .previousRoundInfo[gameRoomMap[gameRoomId].roundNo]
                .player2 = msg.sender;
            gameRoomMap[gameRoomId]
                .previousRoundInfo[gameRoomMap[gameRoomId].roundNo]
                .player2Card = cardTypeId;
            gameRoomMap[gameRoomId]
                .previousRoundInfo[gameRoomMap[gameRoomId].roundNo]
                .exposedStat = exposedStat;
            gameRoomMap[gameRoomId].player2.exposedNfts.push(cardTypeId);
        }
        playerMap[msg.sender].exposedNfts.push(cardTypeId);
        if (gameRoomMap[gameRoomId].currentExposedStat == Stat.NULL) {
            gameRoomMap[gameRoomId].currentExposedStat = exposedStat;
            // trigger further move events
            emit PlayerTurn(
                gameRoomMap[gameRoomId].roundState == RoundState.Player1Turn
                    ? gameRoomMap[gameRoomId].player2.walletAddress
                    : gameRoomMap[gameRoomId].player1.walletAddress,
                true,
                false,
                gameRoomId
            );
            if (gameRoomMap[gameRoomId].roundState == RoundState.Player1Turn) {
                gameRoomMap[gameRoomId].roundState = RoundState.Player2Turn;
            } else if (
                gameRoomMap[gameRoomId].roundState == RoundState.Player2Turn
            ) {
                gameRoomMap[gameRoomId].roundState = RoundState.Player1Turn;
            }
        }

        // if last move of the round then call _processRound
        if (
            gameRoomMap[gameRoomId]
                .previousRoundInfo[gameRoomMap[gameRoomId].roundNo]
                .player1Card !=
            0 &&
            gameRoomMap[gameRoomId]
                .previousRoundInfo[gameRoomMap[gameRoomId].roundNo]
                .player2Card !=
            0 &&
            gameRoomMap[gameRoomId]
                .previousRoundInfo[gameRoomMap[gameRoomId].roundNo]
                .player1 !=
            address(0) &&
            gameRoomMap[gameRoomId]
                .previousRoundInfo[gameRoomMap[gameRoomId].roundNo]
                .player2 !=
            address(0)
        ) {
            _processRound(gameRoomId);
        }
    }
}
