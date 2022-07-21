// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

// NFT Types + NFT

contract NowggNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    mapping(uint256 => Pokemon) public pokemonMetaData;
    mapping(address => uint256[]) public playerOwnedNfts;
    address nowggMarketplace;

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

    function setNowggMarketPlaceAddress(address deployedContractAddress) public {
        nowggMarketplace = deployedContractAddress;
    }

    struct PokemonTypes {
        mapping(uint256 => Pokemon) pokemonTypes;
        uint256 totalPokemons;
    }

    PokemonTypes public _pokemons;

    function getPokemon(uint256 index) public view returns (Pokemon memory) {
        return _pokemons.pokemonTypes[index];
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

    function registerPlayerCards(address player, uint256 quantity) public {
        if (msg.sender == nowggMarketplace) {
            for (uint256 i = 0; i < quantity; i++) {
                _tokenIdCounter.increment();
                uint256 tokenId = _tokenIdCounter.current();
                mint(player, tokenId, getPokemon(randMod(100)));
                playerOwnedNfts[player].push(tokenId);
            }
        }
    }

    function getAllTokensByOwner() public view returns (uint256[] memory) {
        return playerOwnedNfts[msg.sender];
    }

    function getPokemonMetaData(uint256 token)
        public
        view
        returns (Pokemon memory)
    {
        return pokemonMetaData[token];
    }

    constructor() ERC721("NowggNFT", "NT") {
        _pokemons.pokemonTypes[0] = Pokemon(
            16,
            "Pidgey",
            ["Normal", "Flying"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/016.png",
            40,
            45,
            40,
            35,
            35,
            56
        );
        _pokemons.pokemonTypes[1] = Pokemon(
            17,
            "Pidgeotto",
            ["Normal", "Flying"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/017.png",
            63,
            60,
            55,
            50,
            50,
            71
        );
        _pokemons.pokemonTypes[2] = Pokemon(
            18,
            "Pidgeot",
            ["Normal", "Flying"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/018.png",
            83,
            80,
            75,
            70,
            70,
            101
        );
        _pokemons.pokemonTypes[3] = Pokemon(
            19,
            "Rattata",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/019.png",
            30,
            56,
            35,
            25,
            35,
            72
        );
        _pokemons.pokemonTypes[4] = Pokemon(
            20,
            "Raticate",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/020.png",
            55,
            81,
            60,
            50,
            70,
            97
        );
        _pokemons.pokemonTypes[5] = Pokemon(
            21,
            "Spearow",
            ["Normal", "Flying"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/021.png",
            40,
            60,
            30,
            31,
            31,
            70
        );
        _pokemons.pokemonTypes[6] = Pokemon(
            22,
            "Fearow",
            ["Normal", "Flying"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/022.png",
            65,
            90,
            65,
            61,
            61,
            100
        );
        _pokemons.pokemonTypes[7] = Pokemon(
            39,
            "Jigglypuff",
            ["Normal", "Fairy"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/039.png",
            115,
            45,
            20,
            45,
            25,
            20
        );
        _pokemons.pokemonTypes[8] = Pokemon(
            40,
            "Wigglytuff",
            ["Normal", "Fairy"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/040.png",
            140,
            70,
            45,
            85,
            50,
            45
        );
        _pokemons.pokemonTypes[9] = Pokemon(
            52,
            "Meowth",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/052.png",
            40,
            45,
            35,
            40,
            40,
            90
        );
        _pokemons.pokemonTypes[10] = Pokemon(
            53,
            "Persian",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/053.png",
            65,
            70,
            60,
            65,
            65,
            115
        );
        _pokemons.pokemonTypes[11] = Pokemon(
            83,
            "Farfetched",
            ["Normal", "Flying"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/083.png",
            52,
            90,
            55,
            58,
            62,
            60
        );
        _pokemons.pokemonTypes[12] = Pokemon(
            84,
            "Doduo",
            ["Normal", "Flying"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/084.png",
            35,
            85,
            45,
            35,
            35,
            75
        );
        _pokemons.pokemonTypes[13] = Pokemon(
            85,
            "Dodrio",
            ["Normal", "Flying"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/085.png",
            60,
            110,
            70,
            60,
            60,
            110
        );
        _pokemons.pokemonTypes[14] = Pokemon(
            108,
            "Lickitung",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/108.png",
            90,
            55,
            75,
            60,
            75,
            30
        );
        _pokemons.pokemonTypes[15] = Pokemon(
            113,
            "Chansey",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/113.png",
            250,
            5,
            5,
            35,
            105,
            50
        );
        _pokemons.pokemonTypes[16] = Pokemon(
            115,
            "Kangaskhan",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/115.png",
            105,
            95,
            80,
            40,
            80,
            90
        );
        _pokemons.pokemonTypes[17] = Pokemon(
            128,
            "Tauros",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/128.png",
            75,
            100,
            95,
            40,
            70,
            110
        );
        _pokemons.pokemonTypes[18] = Pokemon(
            132,
            "Ditto",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/132.png",
            48,
            48,
            48,
            48,
            48,
            48
        );
        _pokemons.pokemonTypes[19] = Pokemon(
            133,
            "Eevee",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/133.png",
            55,
            55,
            50,
            45,
            65,
            55
        );
        _pokemons.pokemonTypes[20] = Pokemon(
            137,
            "Porygon",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/137.png",
            65,
            60,
            70,
            85,
            75,
            40
        );
        _pokemons.pokemonTypes[21] = Pokemon(
            143,
            "Snorlax",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/143.png",
            160,
            110,
            65,
            65,
            110,
            30
        );
        _pokemons.pokemonTypes[22] = Pokemon(
            161,
            "Sentret",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/161.png",
            35,
            46,
            34,
            35,
            45,
            20
        );
        _pokemons.pokemonTypes[23] = Pokemon(
            162,
            "Furret",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/162.png",
            85,
            76,
            64,
            45,
            55,
            90
        );
        _pokemons.pokemonTypes[24] = Pokemon(
            163,
            "Hoothoot",
            ["Normal", "Flying"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/163.png",
            60,
            30,
            30,
            36,
            56,
            50
        );
        _pokemons.pokemonTypes[25] = Pokemon(
            164,
            "Noctowl",
            ["Normal", "Flying"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/164.png",
            100,
            50,
            50,
            86,
            96,
            70
        );
        _pokemons.pokemonTypes[26] = Pokemon(
            174,
            "Igglybuff",
            ["Normal", "Fairy"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/174.png",
            90,
            30,
            15,
            40,
            20,
            15
        );
        _pokemons.pokemonTypes[27] = Pokemon(
            190,
            "Aipom",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/190.png",
            55,
            70,
            55,
            40,
            55,
            85
        );
        _pokemons.pokemonTypes[28] = Pokemon(
            203,
            "Girafarig",
            ["Normal", "Psychic"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/203.png",
            70,
            80,
            65,
            90,
            65,
            85
        );
        _pokemons.pokemonTypes[29] = Pokemon(
            206,
            "Dunsparce",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/206.png",
            100,
            70,
            70,
            65,
            65,
            45
        );
        _pokemons.pokemonTypes[30] = Pokemon(
            216,
            "Teddiursa",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/216.png",
            60,
            80,
            50,
            50,
            50,
            40
        );
        _pokemons.pokemonTypes[31] = Pokemon(
            217,
            "Ursaring",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/217.png",
            90,
            130,
            75,
            75,
            75,
            55
        );
        _pokemons.pokemonTypes[32] = Pokemon(
            233,
            "Porygon2",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/233.png",
            85,
            80,
            90,
            105,
            95,
            60
        );
        _pokemons.pokemonTypes[33] = Pokemon(
            234,
            "Stantler",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/234.png",
            73,
            95,
            62,
            85,
            65,
            85
        );
        _pokemons.pokemonTypes[34] = Pokemon(
            235,
            "Smeargle",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/235.png",
            55,
            20,
            35,
            20,
            45,
            75
        );
        _pokemons.pokemonTypes[35] = Pokemon(
            241,
            "Miltank",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/241.png",
            95,
            80,
            105,
            40,
            70,
            100
        );
        _pokemons.pokemonTypes[36] = Pokemon(
            242,
            "Blissey",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/242.png",
            255,
            10,
            10,
            75,
            135,
            55
        );
        _pokemons.pokemonTypes[37] = Pokemon(
            263,
            "Zigzagoon",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/263.png",
            38,
            30,
            41,
            30,
            41,
            60
        );
        _pokemons.pokemonTypes[38] = Pokemon(
            264,
            "Linoone",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/264.png",
            78,
            70,
            61,
            50,
            61,
            100
        );
        _pokemons.pokemonTypes[39] = Pokemon(
            276,
            "Taillow",
            ["Normal", "Flying"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/276.png",
            40,
            55,
            30,
            30,
            30,
            85
        );
        _pokemons.pokemonTypes[40] = Pokemon(
            277,
            "Swellow",
            ["Normal", "Flying"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/277.png",
            60,
            85,
            60,
            75,
            50,
            125
        );
        _pokemons.pokemonTypes[41] = Pokemon(
            287,
            "Slakoth",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/287.png",
            60,
            60,
            60,
            35,
            35,
            30
        );
        _pokemons.pokemonTypes[42] = Pokemon(
            288,
            "Vigoroth",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/288.png",
            80,
            80,
            80,
            55,
            55,
            90
        );
        _pokemons.pokemonTypes[43] = Pokemon(
            289,
            "Slaking",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/289.png",
            150,
            160,
            100,
            95,
            65,
            100
        );
        _pokemons.pokemonTypes[44] = Pokemon(
            293,
            "Whismur",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/293.png",
            64,
            51,
            23,
            51,
            23,
            28
        );
        _pokemons.pokemonTypes[45] = Pokemon(
            294,
            "Loudred",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/294.png",
            84,
            71,
            43,
            71,
            43,
            48
        );
        _pokemons.pokemonTypes[46] = Pokemon(
            295,
            "Exploud",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/295.png",
            104,
            91,
            63,
            91,
            73,
            68
        );
        _pokemons.pokemonTypes[47] = Pokemon(
            298,
            "Azurill",
            ["Normal", "Fairy"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/298.png",
            50,
            20,
            40,
            20,
            40,
            20
        );
        _pokemons.pokemonTypes[48] = Pokemon(
            300,
            "Skitty",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/300.png",
            50,
            45,
            45,
            35,
            35,
            50
        );
        _pokemons.pokemonTypes[49] = Pokemon(
            301,
            "Delcatty",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/301.png",
            70,
            65,
            65,
            55,
            55,
            90
        );
        _pokemons.pokemonTypes[50] = Pokemon(
            327,
            "Spinda",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/327.png",
            60,
            60,
            60,
            60,
            60,
            60
        );
        _pokemons.pokemonTypes[51] = Pokemon(
            333,
            "Swablu",
            ["Normal", "Flying"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/333.png",
            45,
            40,
            60,
            40,
            75,
            50
        );
        _pokemons.pokemonTypes[52] = Pokemon(
            335,
            "Zangoose",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/335.png",
            73,
            115,
            60,
            60,
            60,
            90
        );
        _pokemons.pokemonTypes[53] = Pokemon(
            351,
            "Castform",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/351.png",
            70,
            70,
            70,
            70,
            70,
            70
        );
        _pokemons.pokemonTypes[54] = Pokemon(
            352,
            "Kecleon",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/352.png",
            60,
            90,
            70,
            60,
            120,
            40
        );
        _pokemons.pokemonTypes[55] = Pokemon(
            396,
            "Starly",
            ["Normal", "Flying"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/396.png",
            40,
            55,
            30,
            30,
            30,
            60
        );
        _pokemons.pokemonTypes[56] = Pokemon(
            397,
            "Staravia",
            ["Normal", "Flying"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/397.png",
            55,
            75,
            50,
            40,
            40,
            80
        );
        _pokemons.pokemonTypes[57] = Pokemon(
            398,
            "Staraptor",
            ["Normal", "Flying"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/398.png",
            85,
            120,
            70,
            50,
            60,
            100
        );
        _pokemons.pokemonTypes[58] = Pokemon(
            399,
            "Bidoof",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/399.png",
            59,
            45,
            40,
            35,
            40,
            31
        );
        _pokemons.pokemonTypes[59] = Pokemon(
            400,
            "Bibarel",
            ["Normal", "Water"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/400.png",
            79,
            85,
            60,
            55,
            60,
            71
        );
        _pokemons.pokemonTypes[60] = Pokemon(
            424,
            "Ambipom",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/424.png",
            75,
            100,
            66,
            60,
            66,
            115
        );
        _pokemons.pokemonTypes[61] = Pokemon(
            427,
            "Buneary",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/427.png",
            55,
            66,
            44,
            44,
            56,
            85
        );
        _pokemons.pokemonTypes[62] = Pokemon(
            428,
            "Lopunny",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/428.png",
            65,
            76,
            84,
            54,
            96,
            105
        );
        _pokemons.pokemonTypes[63] = Pokemon(
            431,
            "Glameow",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/431.png",
            49,
            55,
            42,
            42,
            37,
            85
        );
        _pokemons.pokemonTypes[64] = Pokemon(
            432,
            "Purugly",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/432.png",
            71,
            82,
            64,
            64,
            59,
            112
        );
        _pokemons.pokemonTypes[65] = Pokemon(
            440,
            "Happiny",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/440.png",
            100,
            5,
            5,
            15,
            65,
            30
        );
        _pokemons.pokemonTypes[66] = Pokemon(
            441,
            "Chatot",
            ["Normal", "Flying"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/441.png",
            76,
            65,
            45,
            92,
            42,
            91
        );
        _pokemons.pokemonTypes[67] = Pokemon(
            446,
            "Munchlax",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/446.png",
            135,
            85,
            40,
            40,
            85,
            5
        );
        _pokemons.pokemonTypes[68] = Pokemon(
            463,
            "Lickilicky",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/463.png",
            110,
            85,
            95,
            80,
            95,
            50
        );
        _pokemons.pokemonTypes[69] = Pokemon(
            474,
            "Porygon-Z",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/474.png",
            85,
            80,
            70,
            135,
            75,
            90
        );
        _pokemons.pokemonTypes[70] = Pokemon(
            486,
            "Regigigas",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/486.png",
            110,
            160,
            110,
            80,
            110,
            100
        );
        _pokemons.pokemonTypes[71] = Pokemon(
            493,
            "Arceus",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/493.png",
            120,
            120,
            120,
            120,
            120,
            120
        );
        _pokemons.pokemonTypes[72] = Pokemon(
            504,
            "Patrat",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/504.png",
            45,
            55,
            39,
            35,
            39,
            42
        );
        _pokemons.pokemonTypes[73] = Pokemon(
            505,
            "Watchog",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/505.png",
            60,
            85,
            69,
            60,
            69,
            77
        );
        _pokemons.pokemonTypes[74] = Pokemon(
            506,
            "Lillipup",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/506.png",
            45,
            60,
            45,
            25,
            45,
            55
        );
        _pokemons.pokemonTypes[75] = Pokemon(
            507,
            "Herdier",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/507.png",
            65,
            80,
            65,
            35,
            65,
            60
        );
        _pokemons.pokemonTypes[76] = Pokemon(
            508,
            "Stoutland",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/508.png",
            85,
            110,
            90,
            45,
            90,
            80
        );
        _pokemons.pokemonTypes[77] = Pokemon(
            519,
            "Pidove",
            ["Normal", "Flying"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/519.png",
            50,
            55,
            50,
            36,
            30,
            43
        );
        _pokemons.pokemonTypes[78] = Pokemon(
            520,
            "Tranquill",
            ["Normal", "Flying"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/520.png",
            62,
            77,
            62,
            50,
            42,
            65
        );
        _pokemons.pokemonTypes[79] = Pokemon(
            521,
            "Unfezant",
            ["Normal", "Flying"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/521.png",
            80,
            115,
            80,
            65,
            55,
            93
        );
        _pokemons.pokemonTypes[80] = Pokemon(
            531,
            "Audino",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/531.png",
            103,
            60,
            86,
            60,
            86,
            50
        );
        _pokemons.pokemonTypes[81] = Pokemon(
            572,
            "Minccino",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/572.png",
            55,
            50,
            40,
            40,
            40,
            75
        );
        _pokemons.pokemonTypes[82] = Pokemon(
            573,
            "Cinccino",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/573.png",
            75,
            95,
            60,
            65,
            60,
            115
        );
        _pokemons.pokemonTypes[83] = Pokemon(
            585,
            "Deerling",
            ["Normal", "Grass"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/585.png",
            60,
            60,
            50,
            40,
            50,
            75
        );
        _pokemons.pokemonTypes[84] = Pokemon(
            586,
            "Sawsbuck",
            ["Normal", "Grass"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/586.png",
            80,
            100,
            70,
            60,
            70,
            95
        );
        _pokemons.pokemonTypes[85] = Pokemon(
            626,
            "Bouffalant",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/626.png",
            95,
            110,
            95,
            40,
            95,
            55
        );
        _pokemons.pokemonTypes[86] = Pokemon(
            627,
            "Rufflet",
            ["Normal", "Flying"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/627.png",
            70,
            83,
            50,
            37,
            50,
            60
        );
        _pokemons.pokemonTypes[87] = Pokemon(
            628,
            "Braviary",
            ["Normal", "Flying"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/628.png",
            100,
            123,
            75,
            57,
            75,
            80
        );
        _pokemons.pokemonTypes[88] = Pokemon(
            648,
            "Meloetta",
            ["Normal", "Psychic"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/648.png",
            100,
            77,
            77,
            128,
            128,
            90
        );
        _pokemons.pokemonTypes[89] = Pokemon(
            659,
            "Bunnelby",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/659.png",
            38,
            36,
            38,
            32,
            36,
            57
        );
        _pokemons.pokemonTypes[90] = Pokemon(
            660,
            "Diggersby",
            ["Normal", "Ground"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/660.png",
            85,
            56,
            77,
            50,
            77,
            78
        );
        _pokemons.pokemonTypes[91] = Pokemon(
            661,
            "Fletchling",
            ["Normal", "Flying"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/661.png",
            45,
            50,
            43,
            40,
            38,
            62
        );
        _pokemons.pokemonTypes[92] = Pokemon(
            667,
            "Litleo",
            ["Fire", "Normal"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/667.png",
            62,
            50,
            58,
            73,
            54,
            72
        );
        _pokemons.pokemonTypes[93] = Pokemon(
            668,
            "Pyroar",
            ["Fire", "Normal"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/668.png",
            86,
            68,
            72,
            109,
            66,
            106
        );
        _pokemons.pokemonTypes[94] = Pokemon(
            676,
            "Furfrou",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/676.png",
            75,
            80,
            60,
            65,
            90,
            102
        );
        _pokemons.pokemonTypes[95] = Pokemon(
            694,
            "Helioptile",
            ["Electric", "Normal"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/694.png",
            44,
            38,
            33,
            61,
            43,
            70
        );
        _pokemons.pokemonTypes[96] = Pokemon(
            695,
            "Heliolisk",
            ["Electric", "Normal"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/695.png",
            62,
            55,
            52,
            109,
            94,
            109
        );
        _pokemons.pokemonTypes[97] = Pokemon(
            731,
            "Pikipek",
            ["Normal", "Flying"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/731.png",
            35,
            75,
            30,
            30,
            30,
            65
        );
        _pokemons.pokemonTypes[98] = Pokemon(
            732,
            "Trumbeak",
            ["Normal", "Flying"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/732.png",
            55,
            85,
            50,
            40,
            50,
            75
        );
        _pokemons.pokemonTypes[99] = Pokemon(
            733,
            "Toucannon",
            ["Normal", "Flying"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/733.png",
            80,
            120,
            75,
            75,
            75,
            60
        );
        _pokemons.pokemonTypes[100] = Pokemon(
            734,
            "Yungoos",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/734.png",
            48,
            70,
            30,
            30,
            30,
            45
        );
        _pokemons.pokemonTypes[101] = Pokemon(
            735,
            "Gumshoos",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/735.png",
            88,
            110,
            60,
            55,
            60,
            45
        );
        _pokemons.pokemonTypes[102] = Pokemon(
            759,
            "Stufful",
            ["Normal", "Fighting"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/759.png",
            70,
            75,
            50,
            45,
            50,
            50
        );
        _pokemons.pokemonTypes[103] = Pokemon(
            760,
            "Bewear",
            ["Normal", "Fighting"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/760.png",
            120,
            125,
            80,
            55,
            60,
            60
        );
        _pokemons.pokemonTypes[104] = Pokemon(
            765,
            "Oranguru",
            ["Normal", "Psychic"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/765.png",
            90,
            60,
            80,
            90,
            110,
            60
        );
        _pokemons.pokemonTypes[105] = Pokemon(
            772,
            "Type: Null",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/772.png",
            95,
            95,
            95,
            95,
            95,
            59
        );
        _pokemons.pokemonTypes[106] = Pokemon(
            773,
            "Silvally",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/773.png",
            95,
            95,
            95,
            95,
            95,
            95
        );
        _pokemons.pokemonTypes[107] = Pokemon(
            775,
            "Komala",
            ["Normal", ""],
            "https://storage.googleapis.com/zeta-95016.appspot.com/775.png",
            65,
            115,
            65,
            75,
            95,
            65
        );
        _pokemons.pokemonTypes[108] = Pokemon(
            780,
            "Drampa",
            ["Normal", "Dragon"],
            "https://storage.googleapis.com/zeta-95016.appspot.com/780.png",
            78,
            60,
            85,
            135,
            91,
            36
        );
        _pokemons.totalPokemons = 109;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721) {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function mint(
        address to,
        uint256 tokenId,
        Pokemon memory _pokemon
    ) public {
        _safeMint(to, tokenId);
        pokemonMetaData[tokenId] = _pokemon;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721)
        returns (string memory)
    {
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        pokemonMetaData[tokenId].name,
                        '",',
                        '"image_data": "',
                        pokemonMetaData[tokenId].image,
                        '",',
                        '"type": ["',
                        pokemonMetaData[tokenId].pokemonType[0],
                        '","',
                        pokemonMetaData[tokenId].pokemonType[1],
                        '"],',
                        '"attributes": [',
                        '{"trait_type": "HP", "value": ',
                        Strings.toString(pokemonMetaData[tokenId].hp),
                        "},",
                        '{"trait_type": "Attack", "value": ',
                        Strings.toString(pokemonMetaData[tokenId].attack),
                        "},",
                        '{"trait_type": "Defense", "value": ',
                        Strings.toString(pokemonMetaData[tokenId].defense),
                        "},",
                        '{"trait_type": "SpAttack", "value": ',
                        Strings.toString(pokemonMetaData[tokenId].spAttack),
                        "},",
                        '{"trait_type": "SpDefense", "value": ',
                        Strings.toString(pokemonMetaData[tokenId].spDefense),
                        "},",
                        '{"trait_type": "Speed", "value": ',
                        Strings.toString(pokemonMetaData[tokenId].speed),
                        "}"
                        "]}"
                    )
                )
            )
        );
        return string(abi.encodePacked(json));
    }
}
