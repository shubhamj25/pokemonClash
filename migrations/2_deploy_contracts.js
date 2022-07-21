const IdentityNft = artifacts.require('IdentityNft')
const NowggNFT = artifacts.require('NowggNFT')
const GamePlay = artifacts.require('GamePlay')
const Whilelist = artifacts.require('Whitelist')
const NowggMarketplace = artifacts.require('NowggMarketplace')
const NowggFT = artifacts.require('NowggFT')

module.exports = function (deployer, network, accounts) {
  deployer.deploy(Whilelist).then(async () =>
    await deployer.deploy(NowggFT, Whilelist.address).then(async () => {
      await deployer.deploy(NowggNFT)
      await deployer.deploy(IdentityNft)
    }).then(async () => {
      await deployer.deploy(NowggMarketplace, NowggFT.address, NowggNFT.address, IdentityNft.address, accounts[0])
      await deployer.deploy(GamePlay, NowggNFT.address, NowggFT.address, accounts[0])
      let whitelist = await Whilelist.deployed()
      let nowggNFT = await NowggNFT.deployed()
      whitelist.addMember(NowggMarketplace.address, { from: accounts[0] })
      nowggNFT.setNowggMarketPlaceAddress(NowggMarketplace.address, { from: accounts[0] })
    })
  )
}
