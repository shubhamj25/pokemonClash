import Web3 from 'web3'

export function encrypt(blindingFactor, data, sender) {
  const web3 = new Web3(Web3.givenProvider)
  return web3.utils.soliditySha3(blindingFactor, data, sender)
}