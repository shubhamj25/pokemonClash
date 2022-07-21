/* eslint-disable jsx-control-statements/jsx-use-if-tag */
import { useEffect, useState } from 'react'
import Web3 from 'web3'
import '../App.scss'
import Connection from '../images/connection.png'
import Card from './card'
import PokemonNft from '../abis/PokemonNft.json'
import GamePlay from '../abis/GamePlay.json'
import { DEFAULT_ADDRESS, getStatByIndex } from './config'

const PokemonGameMain = () => {

  const [account, setAccount] = useState(null)
  const [contract, loadSmartContract] = useState(null)
  const [nftContract, loadNftSmartContract] = useState(null)

  const [cards, setCards] = useState([])
  const [extraMsg, setExtraMsg] = useState(null)
  const [exposedCard, setExposedCard] = useState(null)
  const [isCardExposed, setIsCardExposed] = useState(false)
  const [transactionAllowed, setransactionAllowed] = useState(false)
  const [isCardPackLoaded, toggleLoadCardPack] = useState(false)
  const [connectedTo, setConnectedTo] = useState('')
  const [isLoading, setLoading] = useState(true)
  const [endGameAllowed, setEndGameAllowed] = useState(false)
  const [winner, setWinner] = useState()
  const [playerData, setPlayerData] = useState()
  const [opponentData, setOpponentData] = useState(null)
  const [trump, setTrump] = useState('0')

  async function loadWeb3() {
    const web3 = new Web3(Web3.givenProvider)
    const account = await web3.eth.getAccounts()
    setAccount(account)
    const networkId = await web3.eth.net.getId()
    let networkDataNftContract = PokemonNft.networks[networkId]
    let networkDataGamePlay = GamePlay.networks[networkId]
    const pokemonGame = new web3.eth.Contract(GamePlay.abi, networkDataGamePlay.address)
    const pokemonNft = new web3.eth.Contract(PokemonNft.abi, networkDataNftContract.address)
    loadSmartContract(pokemonGame)
    loadNftSmartContract(pokemonNft)
    await pokemonGame.methods.getGlobalPlayerState().call({ from: account[0] }).then(async (player) => {
      if (player.nfts.length !== 0 || (player.nfts.length === 0 && player.points !== '0')) {
        addCards(player.nfts)
        toggleLoadCardPack(true)
        if (player.walletAddress !== DEFAULT_ADDRESS) {
          setPlayerData(player)
          if (player.exposedNft !== '0') {
            setExposedCard(player.exposedNft)
            player.exposedNft !== '0' && setIsCardExposed(true)
          }
          if (player.exposedStat !== '0') {
            setTrump(player.exposedStat)
          }
          if (player.connectedTo !== DEFAULT_ADDRESS) {
            setConnectedTo(player.connectedTo)
            await pokemonGame.methods.globalPlayerState(player.connectedTo).call().then((p) => {
              setOpponentData(p)
              p.exposedNft !== '0' && player.exposedNft !== '0' && setransactionAllowed(true)
            })
            if (player.winner !== DEFAULT_ADDRESS) {
              setWinner(player.winner === account[0].toString() ? 'Game ended by one of the users ,Yayy You Won!' : 'Game ended by one of the users ,You Lost :(')
            }
            setEndGameAllowed(true)
          }
          setLoading(false)
        }
      }
      else {
        setLoading(false)
      }
    })
    //Event Subscriptions
    const subscriptionCallBack = (error, result) => {
      if (!error) {
        if (result.returnValues.to === account[0].toString()) {
          console.log(result)
          window.location.reload()
        }
      }
    }
    pokemonGame.events.OpponentFound((error, _) => !error && window.location.reload())
    pokemonGame.events.OpponentNotFound((error, result) => {
      if (!error) {
        if (result.returnValues.to === account[0].toString()) {
          setExtraMsg('Opponent not found or none of the players have loaded their cardpacks , please try again later!')
        }
      }
    })
    pokemonGame.events.CardsReadyForTally(subscriptionCallBack)
    pokemonGame.events.CardTransfered(subscriptionCallBack)
    pokemonGame.events.ResultDeclared(subscriptionCallBack)
    pokemonGame.events.GameRefreshed(subscriptionCallBack)
    pokemonGame.events.Disconnected(subscriptionCallBack)
  }

  function addCards(c) {
    let list = [...cards]
    for (let i = 0; i < c.length; i++) {
      list = [...list, c[i]]
      setCards([...list])
    }
  }

  function selectRandom20Pokemons(pokemons) {
    let pkmns = []
    for (let i = 0; i < 20; i++) {
      pkmns.push(pokemons[Math.floor(Math.random() * 100)])
    }
    return pkmns
  }

  useEffect(() => {
    loadWeb3()
  }, [])

  useEffect(() => {
  }, [cards])

  return (
    <div>
      <div className='account-status'>Account : {account} </div>
      <div className='rules border'><div className='heading'>RULES</div>
        <ul>
          <li className='rule'>Player with more points wins in the end !</li>
          <li className='rule'>Load your card pack to play</li>
          <li className='rule'>Find an opponent ,post connection expose your card by clicking on one of the stats you want to use for tally</li>
          <li className='rule'>Once you transact ,winner gets a point and loser gets none</li>
          <li className='rule'>You can end and start a new game anytime (Either of the players must have greater points as compared to its opponent while finishing the game)</li>
          <li className='rule'>Don't forget to connect your metamask wallet before playing ! Enjoy :)</li>
        </ul>
      </div>
      <div className='connection'>
        <div className='account-controls'>
          <div className='account-status'> <img src={Connection} width={30} height={16} /> Connected With : <div className={'success'}>{connectedTo}</div></div>
          {connectedTo && <div className='button more-danger outlined disconnect' onClick={async () => {
            contract && await contract.methods.disconnect().send({ from: account[0] }).then(() => {
              window.location.reload()
            })
          }}>Disconnect</div>}
        </div>
        <div className='trump'>
          <div className='account-status'>Exposed Stat : {trump && getStatByIndex(trump)}</div>
        </div>
        {playerData && <div className='account-status danger'>Points : {playerData.points}</div>}
      </div>

      <div className='button'>Winner : {winner ?? 'Not decided yet!'}</div>
      <div className='button extra-message'>{extraMsg ?? extraMsg}</div>
      <div className='account-status card-pack'>My Card Pack </div>
      {isCardPackLoaded ? !isLoading ? <div className='player-cards'>{
        cards && cards.map((_, i) =>
          <Card
            key={i}
            card={cards[i]}
            contract={nftContract}
            onCardSelect={async (token, stat) => {
              !isCardExposed && !winner && await contract.methods.exposeCardForTally(token, stat).send({ from: account[0] }).once('receipt', (reciept) => {
                console.log(reciept)
                setIsCardExposed(true)
                window.location.reload()
              })
            }}
          />)
      }</div> : <div className='loading'>Loading ...</div>
        : <div className='button' onClick={async () => {
          nftContract && await nftContract.methods.balanceOf(account[0]).call({ from: account[0] }).then(async val => {
            if (val === '0') {
              console.log('tr1')
              console.log(nftContract)
              nftContract && await nftContract.methods.registerPlayerCards().send({ from: account[0] })
            }
            console.log('tr2')
            nftContract && await nftContract.methods.getAllTokensByOwner().call({ from: account[0] }).then(async val => {
              console.log('tr2', val)
              contract && await contract.methods.initPlayerCards(val).send({ from: account[0] }).then(
                (cards) => {
                  addCards(cards)
                  window.location.reload()
                })
            })
          })
        }}>Load Cardpack
        </div>}
      {
        isCardPackLoaded && connectedTo === '' && <div className='button' onClick={async () => {
          contract && await contract.methods.findOpponent().send({ from: account[0] })
        }}>Find opponent
        </div>
      }

      <div className='account-status card-pack'>My Exposed Card</div>
      {!isLoading && exposedCard && (opponentData && opponentData.exposedNft === '0') && <div className='loading'>Wating for opponent to expose card...</div>}
      {!isLoading ? <div className='player-cards'>
        {exposedCard && exposedCard !== '0' ? <Card
          card={exposedCard}
          contract={nftContract}
        /> : <div className='loading border'>No Card Exposed!</div>}

      </div> : <div className='loading'>Loading ...</div>}

      {transactionAllowed && !winner && <div className='button' onClick={async () => {
        let p1, p2
        await nftContract.methods.getPokemonMetaData(playerData.exposedNft).call().then(val => {
          p1 = val
        })
        await nftContract.methods.getPokemonMetaData(opponentData.exposedNft).call().then(val => {
          p2 = val
        })
        console.log(playerData.exposedNft, opponentData.exposedNft)
        p1 && p2 && await contract.methods.tallyAndTransferCards(
          playerData.exposedNft,opponentData.exposedNft)
          .send({ from: account[0] }).then(() => window.location.reload())
      }}>Begin Transaction</div>}

      {isCardPackLoaded && winner && <div className='button danger' onClick={async () => {
        await contract.methods.refreshGame().send({ from: account[0] }).once('receipt', (r) => {
          console.log(r)
          window.location.reload()
        })
      }}>Start a new Game</div>}
      {endGameAllowed && !winner && <div className='button danger' onClick={async () => {
        await contract.methods.finishAndDeclareWinner().send({ from: account[0] }).then(() => window.location.reload())
      }}>Finish Game and Declare Winner !</div>}

    </div>
  )
}

export default PokemonGameMain
