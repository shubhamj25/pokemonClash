const PokemonNft = artifacts.require('PokemonNft')
const GamePlay = artifacts.require('GamePlay')
module.exports = function (deployer) {
  deployer.deploy(PokemonNft).then(()=> 
    deployer.deploy(GamePlay, PokemonNft.address)
  )
}