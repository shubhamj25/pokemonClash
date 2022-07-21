export const TODO_LIST_ADDRESS = '0xa994B43742AC710Ca5C976438D4236E3623B18f4'

export const TODO_LIST_ABI = [
  {
    'inputs': [
      {
        'internalType': 'string',
        'name': '_content',
        'type': 'string'
      }
    ],
    'name': 'createTask',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'id',
        'type': 'uint256'
      },
      {
        'indexed': false,
        'internalType': 'bool',
        'name': 'completed',
        'type': 'bool'
      }
    ],
    'name': 'TaskCompleted',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [
      {
        'indexed': false,
        'internalType': 'uint256',
        'name': 'id',
        'type': 'uint256'
      },
      {
        'indexed': false,
        'internalType': 'string',
        'name': 'content',
        'type': 'string'
      },
      {
        'indexed': false,
        'internalType': 'bool',
        'name': 'completed',
        'type': 'bool'
      }
    ],
    'name': 'TaskCreated',
    'type': 'event'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': '_id',
        'type': 'uint256'
      }
    ],
    'name': 'toggleCompleted',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [],
    'name': 'taskCount',
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
    'name': 'tasks',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': 'id',
        'type': 'uint256'
      },
      {
        'internalType': 'string',
        'name': 'content',
        'type': 'string'
      },
      {
        'internalType': 'bool',
        'name': 'completed',
        'type': 'bool'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  }
]