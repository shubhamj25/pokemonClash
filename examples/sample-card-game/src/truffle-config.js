module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
      gas: 25000000
    },
  },
  contracts_directory: './contracts/',
  contracts_build_directory: './abis/',
  compilers: {
    solc: {
      version : '0.8.15',
      optimizer: {
        enabled: true,
        runs: 200,
      }
    },
  },
}