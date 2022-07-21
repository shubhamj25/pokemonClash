export const POKEMON_GAME_ADDRESS = '0x5c31568C57f240898981a9C10844639535bd0057'
export const POKEMON_NFT_ADDRESS = '0x9cB5ECc4C9d17811b97d9307ba0BeC82aD3c2a0e'
export const DEFAULT_ADDRESS = '0x0000000000000000000000000000000000000000'

export const POKEMON_GAME_ABI = [
  {
    'inputs': [],
    'stateMutability': 'nonpayable',
    'type': 'constructor'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'owner',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'approved',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256'
      }
    ],
    'name': 'Approval',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'owner',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'operator',
        'type': 'address'
      },
      {
        'indexed': false,
        'internalType': 'bool',
        'name': 'approved',
        'type': 'bool'
      }
    ],
    'name': 'ApprovalForAll',
    'type': 'event'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256'
      }
    ],
    'name': 'approve',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'from',
        'type': 'address'
      },
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'to',
        'type': 'address'
      }
    ],
    'name': 'CardTransfered',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'from',
        'type': 'address'
      },
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'to',
        'type': 'address'
      }
    ],
    'name': 'CardsReadyForTally',
    'type': 'event'
  },
  {
    'inputs': [],
    'name': 'disconnect',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'from',
        'type': 'address'
      },
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'to',
        'type': 'address'
      }
    ],
    'name': 'Disconnected',
    'type': 'event'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'token',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'stat',
        'type': 'uint256'
      }
    ],
    'name': 'exposeCardForTally',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'findOpponent',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'finishAndDeclareWinner',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'from',
        'type': 'address'
      },
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'to',
        'type': 'address'
      }
    ],
    'name': 'GameRefreshed',
    'type': 'event'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256[]',
        'name': 'ownedCards',
        'type': 'uint256[]'
      }
    ],
    'name': 'initPlayerCards',
    'outputs': [
      {
        'internalType': 'uint256[]',
        'name': '',
        'type': 'uint256[]'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'from',
        'type': 'address'
      },
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'to',
        'type': 'address'
      }
    ],
    'name': 'OpponentFound',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'from',
        'type': 'address'
      },
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'to',
        'type': 'address'
      }
    ],
    'name': 'OpponentNotFound',
    'type': 'event'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '_modulus',
        'type': 'uint256'
      }
    ],
    'name': 'randMod',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'refreshGame',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'index',
        'type': 'uint256'
      },
      {
        'internalType': 'address',
        'name': 'a',
        'type': 'address'
      }
    ],
    'name': 'remove',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'from',
        'type': 'address'
      },
      {
        'indexed': false,
        'internalType': 'address',
        'name': 'to',
        'type': 'address'
      },
      {
        'indexed': false,
        'internalType': 'string',
        'name': 'message',
        'type': 'string'
      }
    ],
    'name': 'ResultDeclared',
    'type': 'event'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'from',
        'type': 'address'
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256'
      }
    ],
    'name': 'safeTransferFrom',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'from',
        'type': 'address'
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256'
      },
      {
        'internalType': 'bytes',
        'name': '_data',
        'type': 'bytes'
      }
    ],
    'name': 'safeTransferFrom',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'operator',
        'type': 'address'
      },
      {
        'internalType': 'bool',
        'name': 'approved',
        'type': 'bool'
      }
    ],
    'name': 'setApprovalForAll',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'tokenA',
        'type': 'uint256'
      },
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'id',
            'type': 'uint256'
          },
          {
            'internalType': 'string',
            'name': 'name',
            'type': 'string'
          },
          {
            'internalType': 'string[2]',
            'name': 'pokemonType',
            'type': 'string[2]'
          },
          {
            'internalType': 'string',
            'name': 'image',
            'type': 'string'
          },
          {
            'internalType': 'uint8',
            'name': 'hp',
            'type': 'uint8'
          },
          {
            'internalType': 'uint8',
            'name': 'attack',
            'type': 'uint8'
          },
          {
            'internalType': 'uint8',
            'name': 'defense',
            'type': 'uint8'
          },
          {
            'internalType': 'uint8',
            'name': 'spAttack',
            'type': 'uint8'
          },
          {
            'internalType': 'uint8',
            'name': 'spDefense',
            'type': 'uint8'
          },
          {
            'internalType': 'uint8',
            'name': 'speed',
            'type': 'uint8'
          }
        ],
        'internalType': 'struct PokemonClash.Pokemon',
        'name': 'p1',
        'type': 'tuple'
      },
      {
        'internalType': 'address',
        'name': 'ownerA',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'tokenB',
        'type': 'uint256'
      },
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'id',
            'type': 'uint256'
          },
          {
            'internalType': 'string',
            'name': 'name',
            'type': 'string'
          },
          {
            'internalType': 'string[2]',
            'name': 'pokemonType',
            'type': 'string[2]'
          },
          {
            'internalType': 'string',
            'name': 'image',
            'type': 'string'
          },
          {
            'internalType': 'uint8',
            'name': 'hp',
            'type': 'uint8'
          },
          {
            'internalType': 'uint8',
            'name': 'attack',
            'type': 'uint8'
          },
          {
            'internalType': 'uint8',
            'name': 'defense',
            'type': 'uint8'
          },
          {
            'internalType': 'uint8',
            'name': 'spAttack',
            'type': 'uint8'
          },
          {
            'internalType': 'uint8',
            'name': 'spDefense',
            'type': 'uint8'
          },
          {
            'internalType': 'uint8',
            'name': 'speed',
            'type': 'uint8'
          }
        ],
        'internalType': 'struct PokemonClash.Pokemon',
        'name': 'p2',
        'type': 'tuple'
      },
      {
        'internalType': 'address',
        'name': 'ownerB',
        'type': 'address'
      }
    ],
    'name': 'tallyAndTransferCards',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'from',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'to',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256'
      }
    ],
    'name': 'Transfer',
    'type': 'event'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'from',
        'type': 'address'
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256'
      }
    ],
    'name': 'transferFrom',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': '_player',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'id',
        'type': 'uint256'
      },
      {
        'internalType': 'address',
        'name': 'walletAddress',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'exposedStat',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'exposedNft',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'points',
        'type': 'uint256'
      },
      {
        'internalType': 'address',
        'name': 'connectedTo',
        'type': 'address'
      },
      {
        'internalType': 'address',
        'name': 'winner',
        'type': 'address'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'owner',
        'type': 'address'
      }
    ],
    'name': 'balanceOf',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256'
      }
    ],
    'name': 'getApproved',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'getGlobalPlayerState',
    'outputs': [
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'id',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256[]',
            'name': 'nfts',
            'type': 'uint256[]'
          },
          {
            'internalType': 'address',
            'name': 'walletAddress',
            'type': 'address'
          },
          {
            'internalType': 'uint256',
            'name': 'exposedStat',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'exposedNft',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'points',
            'type': 'uint256'
          },
          {
            'internalType': 'address',
            'name': 'connectedTo',
            'type': 'address'
          },
          {
            'internalType': 'address',
            'name': 'winner',
            'type': 'address'
          }
        ],
        'internalType': 'struct PokemonClash.Player',
        'name': '',
        'type': 'tuple'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address'
      }
    ],
    'name': 'globalPlayerState',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'id',
        'type': 'uint256'
      },
      {
        'internalType': 'address',
        'name': 'walletAddress',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'exposedStat',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'exposedNft',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'points',
        'type': 'uint256'
      },
      {
        'internalType': 'address',
        'name': 'connectedTo',
        'type': 'address'
      },
      {
        'internalType': 'address',
        'name': 'winner',
        'type': 'address'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'owner',
        'type': 'address'
      },
      {
        'internalType': 'address',
        'name': 'operator',
        'type': 'address'
      }
    ],
    'name': 'isApprovedForAll',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'name',
    'outputs': [
      {
        'internalType': 'string',
        'name': '',
        'type': 'string'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256'
      }
    ],
    'name': 'ownerOf',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'playerCount',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'name': 'playerIdToAddress',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'bytes4',
        'name': 'interfaceId',
        'type': 'bytes4'
      }
    ],
    'name': 'supportsInterface',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'symbol',
    'outputs': [
      {
        'internalType': 'string',
        'name': '',
        'type': 'string'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256'
      }
    ],
    'name': 'tokenURI',
    'outputs': [
      {
        'internalType': 'string',
        'name': '',
        'type': 'string'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  }
]

export const POKEMON_NFT_ABI = [
  {
    'inputs': [],
    'stateMutability': 'nonpayable',
    'type': 'constructor'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'owner',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'approved',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256'
      }
    ],
    'name': 'Approval',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'owner',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'operator',
        'type': 'address'
      },
      {
        'indexed': false,
        'internalType': 'bool',
        'name': 'approved',
        'type': 'bool'
      }
    ],
    'name': 'ApprovalForAll',
    'type': 'event'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256'
      }
    ],
    'name': 'approve',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256'
      },
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'id',
            'type': 'uint256'
          },
          {
            'internalType': 'string',
            'name': 'name',
            'type': 'string'
          },
          {
            'internalType': 'string[2]',
            'name': 'pokemonType',
            'type': 'string[2]'
          },
          {
            'internalType': 'string',
            'name': 'image',
            'type': 'string'
          },
          {
            'internalType': 'uint8',
            'name': 'hp',
            'type': 'uint8'
          },
          {
            'internalType': 'uint8',
            'name': 'attack',
            'type': 'uint8'
          },
          {
            'internalType': 'uint8',
            'name': 'defense',
            'type': 'uint8'
          },
          {
            'internalType': 'uint8',
            'name': 'spAttack',
            'type': 'uint8'
          },
          {
            'internalType': 'uint8',
            'name': 'spDefense',
            'type': 'uint8'
          },
          {
            'internalType': 'uint8',
            'name': 'speed',
            'type': 'uint8'
          }
        ],
        'internalType': 'struct PokemonNft.Pokemon',
        'name': '_pokemon',
        'type': 'tuple'
      }
    ],
    'name': 'mint',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'id',
            'type': 'uint256'
          },
          {
            'internalType': 'string',
            'name': 'name',
            'type': 'string'
          },
          {
            'internalType': 'string[2]',
            'name': 'pokemonType',
            'type': 'string[2]'
          },
          {
            'internalType': 'string',
            'name': 'image',
            'type': 'string'
          },
          {
            'internalType': 'uint8',
            'name': 'hp',
            'type': 'uint8'
          },
          {
            'internalType': 'uint8',
            'name': 'attack',
            'type': 'uint8'
          },
          {
            'internalType': 'uint8',
            'name': 'defense',
            'type': 'uint8'
          },
          {
            'internalType': 'uint8',
            'name': 'spAttack',
            'type': 'uint8'
          },
          {
            'internalType': 'uint8',
            'name': 'spDefense',
            'type': 'uint8'
          },
          {
            'internalType': 'uint8',
            'name': 'speed',
            'type': 'uint8'
          }
        ],
        'internalType': 'struct PokemonNft.Pokemon[]',
        'name': 'pokemons',
        'type': 'tuple[]'
      }
    ],
    'name': 'registerPlayerCards',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'from',
        'type': 'address'
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256'
      }
    ],
    'name': 'safeTransferFrom',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'from',
        'type': 'address'
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256'
      },
      {
        'internalType': 'bytes',
        'name': '_data',
        'type': 'bytes'
      }
    ],
    'name': 'safeTransferFrom',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'operator',
        'type': 'address'
      },
      {
        'internalType': 'bool',
        'name': 'approved',
        'type': 'bool'
      }
    ],
    'name': 'setApprovalForAll',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'from',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'address',
        'name': 'to',
        'type': 'address'
      },
      {
        'indexed': true,
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256'
      }
    ],
    'name': 'Transfer',
    'type': 'event'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'from',
        'type': 'address'
      },
      {
        'internalType': 'address',
        'name': 'to',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256'
      }
    ],
    'name': 'transferFrom',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'owner',
        'type': 'address'
      }
    ],
    'name': 'balanceOf',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'getAllTokensByOwner',
    'outputs': [
      {
        'internalType': 'uint256[]',
        'name': '',
        'type': 'uint256[]'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256'
      }
    ],
    'name': 'getApproved',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'token',
        'type': 'uint256'
      }
    ],
    'name': 'getPokemonMetaData',
    'outputs': [
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'id',
            'type': 'uint256'
          },
          {
            'internalType': 'string',
            'name': 'name',
            'type': 'string'
          },
          {
            'internalType': 'string[2]',
            'name': 'pokemonType',
            'type': 'string[2]'
          },
          {
            'internalType': 'string',
            'name': 'image',
            'type': 'string'
          },
          {
            'internalType': 'uint8',
            'name': 'hp',
            'type': 'uint8'
          },
          {
            'internalType': 'uint8',
            'name': 'attack',
            'type': 'uint8'
          },
          {
            'internalType': 'uint8',
            'name': 'defense',
            'type': 'uint8'
          },
          {
            'internalType': 'uint8',
            'name': 'spAttack',
            'type': 'uint8'
          },
          {
            'internalType': 'uint8',
            'name': 'spDefense',
            'type': 'uint8'
          },
          {
            'internalType': 'uint8',
            'name': 'speed',
            'type': 'uint8'
          }
        ],
        'internalType': 'struct PokemonNft.Pokemon',
        'name': '',
        'type': 'tuple'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'owner',
        'type': 'address'
      },
      {
        'internalType': 'address',
        'name': 'operator',
        'type': 'address'
      }
    ],
    'name': 'isApprovedForAll',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'name',
    'outputs': [
      {
        'internalType': 'string',
        'name': '',
        'type': 'string'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256'
      }
    ],
    'name': 'ownerOf',
    'outputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': '',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'name': 'playerOwnedNfts',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'name': 'pokemonMetaData',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'id',
        'type': 'uint256'
      },
      {
        'internalType': 'string',
        'name': 'name',
        'type': 'string'
      },
      {
        'internalType': 'string',
        'name': 'image',
        'type': 'string'
      },
      {
        'internalType': 'uint8',
        'name': 'hp',
        'type': 'uint8'
      },
      {
        'internalType': 'uint8',
        'name': 'attack',
        'type': 'uint8'
      },
      {
        'internalType': 'uint8',
        'name': 'defense',
        'type': 'uint8'
      },
      {
        'internalType': 'uint8',
        'name': 'spAttack',
        'type': 'uint8'
      },
      {
        'internalType': 'uint8',
        'name': 'spDefense',
        'type': 'uint8'
      },
      {
        'internalType': 'uint8',
        'name': 'speed',
        'type': 'uint8'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'bytes4',
        'name': 'interfaceId',
        'type': 'bytes4'
      }
    ],
    'name': 'supportsInterface',
    'outputs': [
      {
        'internalType': 'bool',
        'name': '',
        'type': 'bool'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'symbol',
    'outputs': [
      {
        'internalType': 'string',
        'name': '',
        'type': 'string'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'index',
        'type': 'uint256'
      }
    ],
    'name': 'tokenByIndex',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'address',
        'name': 'owner',
        'type': 'address'
      },
      {
        'internalType': 'uint256',
        'name': 'index',
        'type': 'uint256'
      }
    ],
    'name': 'tokenOfOwnerByIndex',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'tokenId',
        'type': 'uint256'
      }
    ],
    'name': 'tokenURI',
    'outputs': [
      {
        'internalType': 'string',
        'name': '',
        'type': 'string'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'totalSupply',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  }
]

export function getStatByIndex(index) {
  if (index === '0') {
    return 'HP'
  } else if (index === '1') {
    return 'Attack'
  } else if (index === '2') {
    return 'Defense'
  } else if (index === '3') {
    return 'Special Attack'
  } else if (index === '4') {
    return 'Special Defense'
  } else {
    return 'Speed'
  }
}

export class Pokemon {
  constructor(id, name, pokemonType, image, hp, attack, defense, spAttack, spDefense, speed) {
    this.id = id
    this.name = name
    this.pokemonType = pokemonType
    this.image = image
    this.hp = hp.toString()
    this.attack = attack.toString()
    this.defense = defense.toString()
    this.spAttack = spAttack.toString()
    this.spDefense = spDefense.toString()
    this.speed = speed.toString()
  }
}

export const pokemons = [
  new Pokemon(16,'Pidgey',['Normal','Flying'],'https://storage.googleapis.com/zeta-95016.appspot.com/016.png',40,45,40,35,35,56),
  new Pokemon(17,'Pidgeotto',['Normal','Flying'],'https://storage.googleapis.com/zeta-95016.appspot.com/017.png',63,60,55,50,50,71),
  new Pokemon(18,'Pidgeot',['Normal','Flying'],'https://storage.googleapis.com/zeta-95016.appspot.com/018.png',83,80,75,70,70,101),
  new Pokemon(19,'Rattata',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/019.png',30,56,35,25,35,72),
  new Pokemon(20,'Raticate',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/020.png',55,81,60,50,70,97),
  new Pokemon(21,'Spearow',['Normal','Flying'],'https://storage.googleapis.com/zeta-95016.appspot.com/021.png',40,60,30,31,31,70),
  new Pokemon(22,'Fearow',['Normal','Flying'],'https://storage.googleapis.com/zeta-95016.appspot.com/022.png',65,90,65,61,61,100),
  new Pokemon(39,'Jigglypuff',['Normal','Fairy'],'https://storage.googleapis.com/zeta-95016.appspot.com/039.png',115,45,20,45,25,20),
  new Pokemon(40,'Wigglytuff',['Normal','Fairy'],'https://storage.googleapis.com/zeta-95016.appspot.com/040.png',140,70,45,85,50,45),
  new Pokemon(52,'Meowth',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/052.png',40,45,35,40,40,90),
  new Pokemon(53,'Persian',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/053.png',65,70,60,65,65,115),
  new Pokemon(83,'Farfetch',['Normal','Flying'],'https://storage.googleapis.com/zeta-95016.appspot.com/083.png',52,90,55,58,62,60),
  new Pokemon(84,'Doduo',['Normal','Flying'],'https://storage.googleapis.com/zeta-95016.appspot.com/084.png',35,85,45,35,35,75),
  new Pokemon(85,'Dodrio',['Normal','Flying'],'https://storage.googleapis.com/zeta-95016.appspot.com/085.png',60,110,70,60,60,110),
  new Pokemon(108,'Lickitung',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/108.png',90,55,75,60,75,30),
  new Pokemon(113,'Chansey',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/113.png',250,5,5,35,105,50),
  new Pokemon(115,'Kangaskhan',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/115.png',105,95,80,40,80,90),
  new Pokemon(128,'Tauros',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/128.png',75,100,95,40,70,110),
  new Pokemon(132,'Ditto',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/132.png',48,48,48,48,48,48),
  new Pokemon(133,'Eevee',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/133.png',55,55,50,45,65,55),
  new Pokemon(137,'Porygon',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/137.png',65,60,70,85,75,40),
  new Pokemon(143,'Snorlax',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/143.png',160,110,65,65,110,30),
  new Pokemon(161,'Sentret',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/161.png',35,46,34,35,45,20),
  new Pokemon(162,'Furret',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/162.png',85,76,64,45,55,90),
  new Pokemon(163,'Hoothoot',['Normal','Flying'],'https://storage.googleapis.com/zeta-95016.appspot.com/163.png',60,30,30,36,56,50),
  new Pokemon(164,'Noctowl',['Normal','Flying'],'https://storage.googleapis.com/zeta-95016.appspot.com/164.png',100,50,50,86,96,70),
  new Pokemon(174,'Igglybuff',['Normal','Fairy'],'https://storage.googleapis.com/zeta-95016.appspot.com/174.png',90,30,15,40,20,15),
  new Pokemon(190,'Aipom',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/190.png',55,70,55,40,55,85),
  new Pokemon(203,'Girafarig',['Normal','Psychic'],'https://storage.googleapis.com/zeta-95016.appspot.com/203.png',70,80,65,90,65,85),
  new Pokemon(206,'Dunsparce',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/206.png',100,70,70,65,65,45),
  new Pokemon(216,'Teddiursa',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/216.png',60,80,50,50,50,40),
  new Pokemon(217,'Ursaring',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/217.png',90,130,75,75,75,55),
  new Pokemon(233,'Porygon2',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/233.png',85,80,90,105,95,60),
  new Pokemon(234,'Stantler',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/234.png',73,95,62,85,65,85),
  new Pokemon(235,'Smeargle',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/235.png',55,20,35,20,45,75),
  new Pokemon(241,'Miltank',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/241.png',95,80,105,40,70,100),
  new Pokemon(242,'Blissey',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/242.png',255,10,10,75,135,55),
  new Pokemon(263,'Zigzagoon',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/263.png',38,30,41,30,41,60),
  new Pokemon(264,'Linoone',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/264.png',78,70,61,50,61,100),
  new Pokemon(276,'Taillow',['Normal','Flying'],'https://storage.googleapis.com/zeta-95016.appspot.com/276.png',40,55,30,30,30,85),
  new Pokemon(277,'Swellow',['Normal','Flying'],'https://storage.googleapis.com/zeta-95016.appspot.com/277.png',60,85,60,75,50,125),
  new Pokemon(287,'Slakoth',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/287.png',60,60,60,35,35,30),
  new Pokemon(288,'Vigoroth',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/288.png',80,80,80,55,55,90),
  new Pokemon(289,'Slaking',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/289.png',150,160,100,95,65,100),
  new Pokemon(293,'Whismur',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/293.png',64,51,23,51,23,28),
  new Pokemon(294,'Loudred',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/294.png',84,71,43,71,43,48),
  new Pokemon(295,'Exploud',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/295.png',104,91,63,91,73,68),
  new Pokemon(298,'Azurill',['Normal','Fairy'],'https://storage.googleapis.com/zeta-95016.appspot.com/298.png',50,20,40,20,40,20),
  new Pokemon(300,'Skitty',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/300.png',50,45,45,35,35,50),
  new Pokemon(301,'Delcatty',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/301.png',70,65,65,55,55,90),
  new Pokemon(327,'Spinda',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/327.png',60,60,60,60,60,60),
  new Pokemon(333,'Swablu',['Normal','Flying'],'https://storage.googleapis.com/zeta-95016.appspot.com/333.png',45,40,60,40,75,50),
  new Pokemon(335,'Zangoose',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/335.png',73,115,60,60,60,90),
  new Pokemon(351,'Castform',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/351.png',70,70,70,70,70,70),
  new Pokemon(352,'Kecleon',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/352.png',60,90,70,60,120,40),
  new Pokemon(396,'Starly',['Normal','Flying'],'https://storage.googleapis.com/zeta-95016.appspot.com/396.png',40,55,30,30,30,60),
  new Pokemon(397,'Staravia',['Normal','Flying'],'https://storage.googleapis.com/zeta-95016.appspot.com/397.png',55,75,50,40,40,80),
  new Pokemon(398,'Staraptor',['Normal','Flying'],'https://storage.googleapis.com/zeta-95016.appspot.com/398.png',85,120,70,50,60,100),
  new Pokemon(399,'Bidoof',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/399.png',59,45,40,35,40,31),
  new Pokemon(400,'Bibarel',['Normal','Water'],'https://storage.googleapis.com/zeta-95016.appspot.com/400.png',79,85,60,55,60,71),
  new Pokemon(424,'Ambipom',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/424.png',75,100,66,60,66,115),
  new Pokemon(427,'Buneary',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/427.png',55,66,44,44,56,85),
  new Pokemon(428,'Lopunny',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/428.png',65,76,84,54,96,105),
  new Pokemon(431,'Glameow',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/431.png',49,55,42,42,37,85),
  new Pokemon(432,'Purugly',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/432.png',71,82,64,64,59,112),
  new Pokemon(440,'Happiny',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/440.png',100,5,5,15,65,30),
  new Pokemon(441,'Chatot',['Normal','Flying'],'https://storage.googleapis.com/zeta-95016.appspot.com/441.png',76,65,45,92,42,91),
  new Pokemon(446,'Munchlax',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/446.png',135,85,40,40,85,5),
  new Pokemon(463,'Lickilicky',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/463.png',110,85,95,80,95,50),
  new Pokemon(474,'Porygon-Z',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/474.png',85,80,70,135,75,90),
  new Pokemon(486,'Regigigas',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/486.png',110,160,110,80,110,100),
  new Pokemon(493,'Arceus',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/493.png',120,120,120,120,120,120),
  new Pokemon(504,'Patrat',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/504.png',45,55,39,35,39,42),
  new Pokemon(505,'Watchog',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/505.png',60,85,69,60,69,77),
  new Pokemon(506,'Lillipup',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/506.png',45,60,45,25,45,55),
  new Pokemon(507,'Herdier',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/507.png',65,80,65,35,65,60),
  new Pokemon(508,'Stoutland',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/508.png',85,110,90,45,90,80),
  new Pokemon(519,'Pidove',['Normal','Flying'],'https://storage.googleapis.com/zeta-95016.appspot.com/519.png',50,55,50,36,30,43),
  new Pokemon(520,'Tranquill',['Normal','Flying'],'https://storage.googleapis.com/zeta-95016.appspot.com/520.png',62,77,62,50,42,65),
  new Pokemon(521,'Unfezant',['Normal','Flying'],'https://storage.googleapis.com/zeta-95016.appspot.com/521.png',80,115,80,65,55,93),
  new Pokemon(531,'Audino',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/531.png',103,60,86,60,86,50),
  new Pokemon(572,'Minccino',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/572.png',55,50,40,40,40,75),
  new Pokemon(573,'Cinccino',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/573.png',75,95,60,65,60,115),
  new Pokemon(585,'Deerling',['Normal','Grass'],'https://storage.googleapis.com/zeta-95016.appspot.com/585.png',60,60,50,40,50,75),
  new Pokemon(586,'Sawsbuck',['Normal','Grass'],'https://storage.googleapis.com/zeta-95016.appspot.com/586.png',80,100,70,60,70,95),
  new Pokemon(626,'Bouffalant',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/626.png',95,110,95,40,95,55),
  new Pokemon(627,'Rufflet',['Normal','Flying'],'https://storage.googleapis.com/zeta-95016.appspot.com/627.png',70,83,50,37,50,60),
  new Pokemon(628,'Braviary',['Normal','Flying'],'https://storage.googleapis.com/zeta-95016.appspot.com/628.png',100,123,75,57,75,80),
  new Pokemon(648,'Meloetta',['Normal','Psychic'],'https://storage.googleapis.com/zeta-95016.appspot.com/648.png',100,77,77,128,128,90),
  new Pokemon(659,'Bunnelby',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/659.png',38,36,38,32,36,57),
  new Pokemon(660,'Diggersby',['Normal','Ground'],'https://storage.googleapis.com/zeta-95016.appspot.com/660.png',85,56,77,50,77,78),
  new Pokemon(661,'Fletchling',['Normal','Flying'],'https://storage.googleapis.com/zeta-95016.appspot.com/661.png',45,50,43,40,38,62),
  new Pokemon(667,'Litleo',['Fire','Normal'],'https://storage.googleapis.com/zeta-95016.appspot.com/667.png',62,50,58,73,54,72),
  new Pokemon(668,'Pyroar',['Fire','Normal'],'https://storage.googleapis.com/zeta-95016.appspot.com/668.png',86,68,72,109,66,106),
  new Pokemon(676,'Furfrou',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/676.png',75,80,60,65,90,102),
  new Pokemon(694,'Helioptile',['Electric','Normal'],'https://storage.googleapis.com/zeta-95016.appspot.com/694.png',44,38,33,61,43,70),
  new Pokemon(695,'Heliolisk',['Electric','Normal'],'https://storage.googleapis.com/zeta-95016.appspot.com/695.png',62,55,52,109,94,109),
  new Pokemon(731,'Pikipek',['Normal','Flying'],'https://storage.googleapis.com/zeta-95016.appspot.com/731.png',35,75,30,30,30,65),
  new Pokemon(732,'Trumbeak',['Normal','Flying'],'https://storage.googleapis.com/zeta-95016.appspot.com/732.png',55,85,50,40,50,75),
  new Pokemon(733,'Toucannon',['Normal','Flying'],'https://storage.googleapis.com/zeta-95016.appspot.com/733.png',80,120,75,75,75,60),
  new Pokemon(734,'Yungoos',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/734.png',48,70,30,30,30,45),
  new Pokemon(735,'Gumshoos',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/735.png',88,110,60,55,60,45),
  new Pokemon(759,'Stufful',['Normal','Fighting'],'https://storage.googleapis.com/zeta-95016.appspot.com/759.png',70,75,50,45,50,50),
  new Pokemon(760,'Bewear',['Normal','Fighting'],'https://storage.googleapis.com/zeta-95016.appspot.com/760.png',120,125,80,55,60,60),
  new Pokemon(765,'Oranguru',['Normal','Psychic'],'https://storage.googleapis.com/zeta-95016.appspot.com/765.png',90,60,80,90,110,60),
  new Pokemon(772,'Type: Null',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/772.png',95,95,95,95,95,59),
  new Pokemon(773,'Silvally',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/773.png',95,95,95,95,95,95),
  new Pokemon(775,'Komala',['Normal',''],'https://storage.googleapis.com/zeta-95016.appspot.com/775.png',65,115,65,75,95,65),
  new Pokemon(780,'Drampa',['Normal','Dragon'],'https://storage.googleapis.com/zeta-95016.appspot.com/780.png',78,60,85,135,91,36)
]
