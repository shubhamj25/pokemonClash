import Web3 from 'web3'
import IdentityNft from '../../abis/IdentityNft.json'

const UserRepository = {
  getUserDetails: async () => {
    const web3 = new Web3(Web3.givenProvider)
    const accounts = await web3.eth.getAccounts()
    if (accounts.length) {
      return {
        connectedAccounts: accounts,
        defaultAccount: accounts[0],
      }
    } else {
      return {
        error: 'Wallet not connected!',
      }
    }
  },
  createIdentityNft: async () => {
    const web3 = new Web3(Web3.givenProvider)
    const accounts = await web3.eth.getAccounts()
    if (accounts.length) {
      const networkId = await web3.eth.net.getId()
      let networkData = IdentityNft.networks[networkId]
      let err
      if (networkData) {
        const abi = IdentityNft.abi
        const address = networkData.address
        const token = new web3.eth.Contract(abi, address)
        let balanceOf = await token.methods.balanceOf(accounts[0]).call()
        if (+balanceOf === 0) {
          token.methods
            .mint(accounts[0]) // doubt: does tokenuri always have to be a known & fetchable entity?
            .send({ from: accounts[0] })
            .on('transactionHash', (hash) => {})
            .on('error', (error) => {
              err = error
            })
            .then(() => {
              if (err) {
                return {
                  error: err,
                }
              } else {
                return {
                  message: 'Identity Nft Created!',
                }
              }
            })
        } else {
          return {
            message: 'Identity Nft already exists',
          }
        }
      }
    }
  },
}

export default UserRepository
