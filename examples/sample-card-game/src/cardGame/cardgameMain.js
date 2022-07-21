/* eslint-disable jsx-control-statements/jsx-use-if-tag */
import { useEffect, useState } from 'react'
import Web3 from 'web3'
import '../App.scss'
import Connection from '../images/connection.png'
import Card from './card'
import { CARD_GAME_ABI, CARD_GAME_ADDRESS, DEFAULT_ADDRESS, getSuit } from './config'

const CardGameMain = () => {

  const [account, setAccount] = useState(null)
  const [contract, loadSmartContract] = useState(null)
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
  const [opponetExposedCard, setOpponentExposedCard] = useState(null)
  const [trump, setTrump] = useState('0')

  async function loadWeb3() {
    const web3 = new Web3(Web3.givenProvider)
    const account = await web3.eth.getAccounts()
    setAccount(account)
    const cardGame = new web3.eth.Contract(CARD_GAME_ABI, CARD_GAME_ADDRESS)
    loadSmartContract(cardGame)
    console.log(cardGame)
    await cardGame.methods.getGlobalPlayerState().call({ from: account[0] }).then(async (player) => {
      if (player.cards.length !== 0 || (player.cards.length === 0 && player.points !== '0')) {
        await cardGame.methods.getCards().call({ from: account[0] }).then((val) => addCards(val))
        toggleLoadCardPack(true)
        if (player.walletAddress !== DEFAULT_ADDRESS) {
          setPlayerData(player)
          console.log(player)
          if (player.exposedCard.number !== '0') {
            setExposedCard(player.exposedCard)
            player.exposedCard.number !== '0' && setIsCardExposed(true)
          }
          if (player.trump !== '0') {
            setTrump(player.trump)
          }
          if (player.connectedTo !== DEFAULT_ADDRESS) {
            setConnectedTo(player.connectedTo)
            await cardGame.methods.globalPlayerState(player.connectedTo).call().then((p) => {
              setOpponentExposedCard(p.exposedCard)
              p.exposedCard.number !== '0' && player.exposedCard.number !== '0' && setransactionAllowed(true)
            })
            if (player.winner !== DEFAULT_ADDRESS) {
              console.log(player.winner)
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
    cardGame.events.OpponentFound((error, _) => !error && window.location.reload())
    cardGame.events.OpponentNotFound((error, result) => {
      if (!error) {
        if (result.returnValues.to === account[0].toString()) {
          console.log(result)
          setExtraMsg('Opponent not found or none of the players have loaded their cardpacks , please try again later!')
        }
      }
    })
    cardGame.events.CardsReadyForTally(subscriptionCallBack)
    cardGame.events.CardTransfered(subscriptionCallBack)
    cardGame.events.ResultDeclared(subscriptionCallBack)
    cardGame.events.GameRefreshed(subscriptionCallBack)
    cardGame.events.Disconnected(subscriptionCallBack)
  }

  function addCards(c) {
    let list = [...cards]
    for (let i = 0; i < c.length; i++) {
      list = [...list, c[i]]
      setCards([...list])
    }
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
          <li className='rule'>Player with lesser cards wins in the end !</li>
          <li className='rule'>Load your card pack to play</li>
          <li className='rule'>Find an opponent ,post connection expose your card for tally</li>
          <li className='rule'>Cards with trump suit dominate over normal cards and highest card number of trump suit is undefeated. Cards with same number and suit will be removed from deck of both players</li>
          <li className='rule'>Once you transact ,if you win you lose your exposed card and if you loose you gain an extra random card</li>
          <li className='rule'>You can end and start a new game anytime (Either of the players must have lesser cards as compared to its opponent while finishing the game)</li>
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
          <div className='account-status'>Trump Suit</div>
          {trump && getSuit(trump)}
        </div>
      </div>

      <div className='button'>Winner : {winner ?? 'Not decided yet!'}</div>
      <div className='button extra-message'>{extraMsg ?? extraMsg}</div>
      <div className='account-status card-pack'>My Card Pack </div>
      {isCardPackLoaded ? !isLoading ? <div className='player-cards'>{
        cards && cards.map((_, i) =>
          <Card
            key={i}
            number={cards[i] && cards[i].number}
            suit={cards[i] && cards[i].suit}
            onCardSelect={async (number, suit) => {
              !isCardExposed && !winner && await contract.methods.exposeCardForTally(number, suit).send({ from: account[0] }).once('receipt', (reciept) => {
                console.log(reciept)
                setIsCardExposed(true)
                window.location.reload()
              })
            }}
          />)
      }</div> : <div className='loading'>Loading ...</div>
        : <div className='button' onClick={async () => {
          contract && await contract.methods.registerPlayerCards().send({ from: account[0] }).then(
            (val) => {
              addCards(val)
              window.location.reload()
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
      {!isLoading && exposedCard && (opponetExposedCard && opponetExposedCard.number === '0') && <div className='loading'>Wating for opponent to expose card...</div>}
      {!isLoading ? <div className='player-cards'>
        {exposedCard && exposedCard.number !== '0' ? <Card
          number={exposedCard && exposedCard.number}
          suit={exposedCard && exposedCard.suit}
        /> : <div className='loading border'>No Card Exposed!</div>}

      </div> : <div className='loading'>Loading ...</div>}

      {transactionAllowed && !winner && <div className="button" onClick={async () => {
        console.log('playerdATA', playerData.exposedCard)
        console.log('opponentdata', opponetExposedCard)
        console.log(trump)
        console.log(cards[0])
        await contract.methods.tallyAndTransferCards(playerData.exposedCard, opponetExposedCard).send({ from: account[0] }).then(() => window.location.reload())
      }}>Begin Transaction</div>}

      {isCardPackLoaded && winner && <div className="button danger" onClick={async () => {
        await contract.methods.refreshGame().send({ from: account[0] }).once('receipt', (r) => {
          console.log(r)
          window.location.reload()
        })
      }}>Start a new Game</div>}
      {endGameAllowed && !winner && <div className="button danger" onClick={async () => {
        await contract.methods.finishAndDeclareWinner().send({ from: account[0] }).then(() => window.location.reload())
      }}>Finish Game and Declare Winner !</div>}

    </div>
  )
}

export default CardGameMain
