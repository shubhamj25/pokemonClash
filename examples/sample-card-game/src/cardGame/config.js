import Clubs from '../images/clubs.svg'
import Diamond from '../images/diamond.svg'
import Hearts from '../images/hearts.svg'
import Spades from '../images/spades.svg'
export const CARD_GAME_ADDRESS = '0x12f15c95E98fB391c5fA6746F1f874122A28FB4f'
export const DEFAULT_ADDRESS = '0x0000000000000000000000000000000000000000'

// FOR READING LOGS FROM BLOCKCHAIN
// export const CardTransferedEventOptions = {
//   reconnect: {
//     auto: true,
//     delay: 5000, // ms
//     maxAttempts: 5,
//     onTimeout: false
//   },
//   address: CARD_GAME_ADDRESS,
//   topics: [
//     '0xe93c0269bc7b23de36b7ffb6cec88a8591254d051d0706eb005ff22eb29e5efc'
//   ]
// }
// export const OpponentFoundEventOptions = {
//   reconnect: {
//     auto: true,
//     delay: 5000, // ms
//     maxAttempts: 5,
//     onTimeout: false
//   },
//   address: CARD_GAME_ADDRESS,
//   topics: [
//     '0x6b05cb7efb75987099d42d34551027fd47dfd531782995fedd208245cf14e010'
//   ]
// }
// export const CardsReadyForTallyEventOptions = {
//   reconnect: {
//     auto: true,
//     delay: 5000, // ms
//     maxAttempts: 5,
//     onTimeout: false
//   },
//   address: CARD_GAME_ADDRESS,
//   topics: [
//     '0xe486fac56ec82c2c395c12e834080a7ede5872b5cb813cd45acea867454e0ede'
//   ]
// }
// export const ResultDeclaredEventOptions = {
//   reconnect: {
//     auto: true,
//     delay: 5000, // ms
//     maxAttempts: 5,
//     onTimeout: false
//   },
//   address: CARD_GAME_ADDRESS,
//   topics: [
//     '0x492051979c9153150db69d44adc425131433d1a39a465ec0b08ad22e5fa6cb1e'
//   ]
// }
// export function subscribeToEvent(web3Provider, eventOptions) {
//   return web3Provider.eth.subscribe('logs', eventOptions, (error, result) => {
//     if (!error) console.log('got result', result)
//     else console.log(error)
//   }).on('data', (log) => {
//     console.log('got data',log)
//     window.location.reload()
//   }).on('changed', (log) => {
//     console.log('changed')
//   })
// }

export const CARD_GAME_ABI = [
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
    'inputs': [],
    'name': '_me',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'id',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'trump',
        'type': 'uint256'
      },
      {
        'internalType': 'address',
        'name': 'walletAddress',
        'type': 'address'
      },
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'number',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'suit',
            'type': 'uint256'
          },
          {
            'internalType': 'address',
            'name': 'owner',
            'type': 'address'
          }
        ],
        'internalType': 'struct CardGame.Card',
        'name': 'exposedCard',
        'type': 'tuple'
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
    'inputs': [],
    'name': '_opponent',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'id',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'trump',
        'type': 'uint256'
      },
      {
        'internalType': 'address',
        'name': 'walletAddress',
        'type': 'address'
      },
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'number',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'suit',
            'type': 'uint256'
          },
          {
            'internalType': 'address',
            'name': 'owner',
            'type': 'address'
          }
        ],
        'internalType': 'struct CardGame.Card',
        'name': 'exposedCard',
        'type': 'tuple'
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
    'inputs': [],
    'name': '_player',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'id',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'trump',
        'type': 'uint256'
      },
      {
        'internalType': 'address',
        'name': 'walletAddress',
        'type': 'address'
      },
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'number',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'suit',
            'type': 'uint256'
          },
          {
            'internalType': 'address',
            'name': 'owner',
            'type': 'address'
          }
        ],
        'internalType': 'struct CardGame.Card',
        'name': 'exposedCard',
        'type': 'tuple'
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
    'inputs': [],
    'name': 'disconnect',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'cardNumber',
        'type': 'uint256'
      },
      {
        'internalType': 'uint256',
        'name': 'suit',
        'type': 'uint256'
      }
    ],
    'name': 'exposeCardForTally',
    'outputs': [
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'number',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'suit',
            'type': 'uint256'
          },
          {
            'internalType': 'address',
            'name': 'owner',
            'type': 'address'
          }
        ],
        'internalType': 'struct CardGame.Card',
        'name': '',
        'type': 'tuple'
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
    'inputs': [],
    'name': 'getCards',
    'outputs': [
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'number',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'suit',
            'type': 'uint256'
          },
          {
            'internalType': 'address',
            'name': 'owner',
            'type': 'address'
          }
        ],
        'internalType': 'struct CardGame.Card[]',
        'name': '',
        'type': 'tuple[]'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'getGlobalCardState',
    'outputs': [
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'number',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'suit',
            'type': 'uint256'
          },
          {
            'internalType': 'address',
            'name': 'owner',
            'type': 'address'
          }
        ],
        'internalType': 'struct CardGame.Card[]',
        'name': '',
        'type': 'tuple[]'
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
            'components': [
              {
                'internalType': 'uint256',
                'name': 'number',
                'type': 'uint256'
              },
              {
                'internalType': 'uint256',
                'name': 'suit',
                'type': 'uint256'
              },
              {
                'internalType': 'address',
                'name': 'owner',
                'type': 'address'
              }
            ],
            'internalType': 'struct CardGame.Card[]',
            'name': 'cards',
            'type': 'tuple[]'
          },
          {
            'internalType': 'uint256',
            'name': 'trump',
            'type': 'uint256'
          },
          {
            'internalType': 'address',
            'name': 'walletAddress',
            'type': 'address'
          },
          {
            'components': [
              {
                'internalType': 'uint256',
                'name': 'number',
                'type': 'uint256'
              },
              {
                'internalType': 'uint256',
                'name': 'suit',
                'type': 'uint256'
              },
              {
                'internalType': 'address',
                'name': 'owner',
                'type': 'address'
              }
            ],
            'internalType': 'struct CardGame.Card',
            'name': 'exposedCard',
            'type': 'tuple'
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
        'internalType': 'struct CardGame.Player',
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
        'internalType': 'uint256',
        'name': 'trump',
        'type': 'uint256'
      },
      {
        'internalType': 'address',
        'name': 'walletAddress',
        'type': 'address'
      },
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'number',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'suit',
            'type': 'uint256'
          },
          {
            'internalType': 'address',
            'name': 'owner',
            'type': 'address'
          }
        ],
        'internalType': 'struct CardGame.Card',
        'name': 'exposedCard',
        'type': 'tuple'
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
    'inputs': [],
    'name': 'registerPlayerCards',
    'outputs': [
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'number',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'suit',
            'type': 'uint256'
          },
          {
            'internalType': 'address',
            'name': 'owner',
            'type': 'address'
          }
        ],
        'internalType': 'struct CardGame.Card[]',
        'name': '',
        'type': 'tuple[]'
      }
    ],
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
    'inputs': [
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'number',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'suit',
            'type': 'uint256'
          },
          {
            'internalType': 'address',
            'name': 'owner',
            'type': 'address'
          }
        ],
        'internalType': 'struct CardGame.Card',
        'name': 'A',
        'type': 'tuple'
      },
      {
        'components': [
          {
            'internalType': 'uint256',
            'name': 'number',
            'type': 'uint256'
          },
          {
            'internalType': 'uint256',
            'name': 'suit',
            'type': 'uint256'
          },
          {
            'internalType': 'address',
            'name': 'owner',
            'type': 'address'
          }
        ],
        'internalType': 'struct CardGame.Card',
        'name': 'B',
        'type': 'tuple'
      }
    ],
    'name': 'tallyAndTransferCards',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  }
]

export function getCardNumber(number) {
  if (number === '13') return 'A'
  else if (number === '12') return 'K'
  else if (number === '11') return 'Q'
  else if (number === '10') return 'J'
  else return `${Number.parseInt(number) + 1}`
}
export function getSuit(suit) {
  if (suit === '1') return <img src={Clubs} height={36} width={36} />
  else if (suit === '2') return <img src={Diamond} height={36} width={36} />
  else if (suit === '3') return <img src={Hearts} height={36} width={36} />
  else if (suit === '4') return <img src={Spades} height={36} width={36} />
}