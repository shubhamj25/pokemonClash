/* eslint-disable jsx-control-statements/jsx-use-if-tag */
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Web3 from 'web3'
import UserActions from '../../global_modules/user/user_actions'
import './dashboard.scss'
import UserInfo from './userInfo/userInfo'
import Lottie from 'react-lottie'
import Register from '../../lottie/register.json'
import GamePlay from '../../abis/GamePlay.json'
import NowggMarketPlace from '../../abis/NowggMarketPlace.json'
import NowggFT from '../../abis/NowggFT.json'
import NowggNFT from '../../abis/NowggNFT.json'
import IdentityNft from '../../abis/IdentityNft.json'
import StorageUtil from '../../utils/storage'
import STORAGE_KEYS from '../../constants/storage_keys'
import { encrypt } from '../../utils/encryptDecrypt'
import PokemonCard from '../../components/pokemonCard/card'
import { FormattedMessage } from 'react-intl'
import { useCommonComponents } from '../../providers/common_components_provider'
import RulesIcon from '../../images/tnc.svg'
import { DialogIds } from '../../constants/dialogs'
import Rules from '../../components/rulesPopup/rules'
import ScoreBoard from './scoreboard/scoreboard'
import { CARD_PACK_PRICE, DEFAULT_ADDRESS, ENTRY_FEE } from '../../constants/constants'
import Winner from '../../lottie/winner.json'
import Loser from '../../lottie/lost.json'
import Quit from '../../lottie/log-out.json'
import Tie from '../../lottie/match-tied.json'
import AddMoney from '../../images/addMoney.svg'
import AddCards from '../../images/tradingCard.png'

const GameState = {
  WON: 'won',
  LOST: 'lost',
  DRAW: 'draw',
  UNDECIDED: 'undecided'
}

const _Dashboard = (props) => {
  const [connectedAccount, setConnectedAccount] = useState('')
  const [ethBalance, setEthBalance] = useState()
  const [gameMoney, setGameMoney] = useState()
  const [currencySymbol, setCurrencySymbol] = useState()
  const [connectedTo, setConnectedTo] = useState()
  const [playgameCta, setPlayGameCta] = useState(<FormattedMessage id="global.registerNplay" />)
  const [nowggMarketplaceContract, loadNowggMarketplaceContract] = useState()
  const [gameplayContract, loadGameplayContract] = useState()
  const [nowggFTContract, loadNowggFTContract] = useState()
  const [nowggNFTContract, loadNowggNFTContract] = useState()
  const [identityNftContract, loadIdentityNftContract] = useState()
  const [blindingFactor, setBlindingFactor] = useState()
  let [cards, setCards] = useState([])
  const [isCardPackLoaded, setIsCardPackLoaded] = useState(false)
  const [isOwnedCardPackLoaded, setIsOwnedCardPackLoaded] = useState(false)
  const [networkId, setNetworkId] = useState()
  const [executeMove, setExecuteMove] = useState(false)
  const [currentExposedStat, setCurrentExposedStat] = useState()
  const [myExposedNft, setMyCurrentExposedNft] = useState()
  const [opponentExposedNft, setOpponentExposedNft] = useState()
  const [myScore, setMyScore] = useState()
  const [opponentScore, setOpponentScore] = useState()
  const [currentRound, setCurrentRound] = useState()
  const [gameState, setGameState] = useState(GameState.UNDECIDED)
  const [currentGameRoomId, setCurrentGameRoomId] = useState()
  let [amountToAdd, setAmountToAdd] = useState()
  const [roundsVerified, setRoundsVerified] = useState()

  const web3 = new Web3(Web3.givenProvider)
  const { userDetails } = props.userDetailsSlice || {}

  async function getBalance() {
    await web3.eth
      .getBalance(userDetails.defaultAccount)
      .then((bal) => {
        setEthBalance(web3.utils.fromWei(bal))
      })
      .then(async (_) => {
        await nowggFTContract.methods
          .balanceOf(connectedAccount)
          .call({ from: connectedAccount })
          .then((bal) => {
            setGameMoney(bal)
          })
          .then(
            async (_) =>
              await nowggFTContract.methods
                .symbol()
                .call({ from: connectedAccount })
                .then((symbol) => {
                  setCurrencySymbol(symbol)
                })
          )
      })
  }

  function loadBlindingFactor() {
    let blindingfactor
    if (StorageUtil.localStorage.get(STORAGE_KEYS.BLINDING_FACTOR)) {
      blindingfactor = StorageUtil.localStorage.get(STORAGE_KEYS.BLINDING_FACTOR)
    } else {
      blindingfactor = Math.floor(Math.random() * Math.pow(10, 12))
      StorageUtil.localStorage.set(STORAGE_KEYS.BLINDING_FACTOR, blindingfactor)
    }
    setBlindingFactor(blindingfactor)
  }

  async function loadWeb3() {
    const networkId = await web3.eth.net.getId()
    setNetworkId(networkId)
    const nowggMarketPlaceNetworkData = NowggMarketPlace.networks[networkId]
    const gamePlayNetworkData = GamePlay.networks[networkId]
    const nowggFTNetworkData = NowggFT.networks[networkId]
    const nowggNFTNetworkData = NowggNFT.networks[networkId]
    //const whitelistNetworkData = Whitelist.networks[networkId]
    const identityNftNetworkData = IdentityNft.networks[networkId]
    // console.log('wlist', whitelistNetworkData.address)
    //console.log('gmplay', gamePlayNetworkData.address)
    // console.log('ft', nowggFTNetworkData.address)
    // console.log('nft', nowggNFTNetworkData.address)
    loadNowggMarketplaceContract(new web3.eth.Contract(NowggMarketPlace.abi, nowggMarketPlaceNetworkData.address))
    loadGameplayContract(new web3.eth.Contract(GamePlay.abi, gamePlayNetworkData.address))
    loadNowggFTContract(new web3.eth.Contract(NowggFT.abi, nowggFTNetworkData.address))
    loadNowggNFTContract(new web3.eth.Contract(NowggNFT.abi, nowggNFTNetworkData.address))
    loadIdentityNftContract(new web3.eth.Contract(IdentityNft.abi, identityNftNetworkData.address))
  }

  function subscribeToEvents() {
    const subscribeToPlayerTurn = async (error, result) => {
      !error && window.location.reload()
    }
    const subscribeToEndGame = async (error, result) => {
      if (!error) {
        console.log('game ended :::')
        if (result.returnValues.winner === connectedAccount.toString() || result.returnValues.loser === connectedAccount.toString()) {
          StorageUtil.localStorage.remove(STORAGE_KEYS.START_VERIFICATION)
          if (result.returnValues.winner !== result.returnValues.loser) {
            if (result.returnValues.winner === connectedAccount.toString()) {
              setGameState(GameState.WON)
            }
            if (result.returnValues.loser === connectedAccount.toString()) {
              setGameState(GameState.LOST)
            }
          }
          else {
            setGameState(GameState.DRAW)
          }
        }
      }
    }
    const subscribeToVerifyCardsEvent = (error, result) => {
      if (!error) {
        console.log('verify cards :::')
        result.returnValues.to === connectedAccount.toString() && StorageUtil.localStorage.set(STORAGE_KEYS.START_VERIFICATION, true)
        window.location.reload()
      }
    }
    gameplayContract.events.PlayerTurn(subscribeToPlayerTurn)
    gameplayContract.events.GameEnded(subscribeToEndGame)
    gameplayContract.events.VerifyCards(subscribeToVerifyCardsEvent)
  }

  const { showLoader, hideLoader, triggerPopup } = useCommonComponents()

  async function loadCardPack() {
    await identityNftContract.methods.balanceOf(connectedAccount).call({ from: connectedAccount }).then(async val => {
      if (val !== '0') {
        await gameplayContract.methods.getPlayerData(connectedAccount).call({ from: connectedAccount })
          .then(async (player) => {
            await nowggNFTContract.methods.getAllTokensByOwner().call({ from: connectedAccount }).then(async (nfts) => {
              setCurrentGameRoomId(player.gameRoomId)
              const { encodedNfts = [], exposedNfts = [] } = player
              if (encodedNfts && encodedNfts.length > 0) {
                cards = []
                for (let i = 0; i < encodedNfts.length; i++) {
                  for (let j = 0; j < nfts.length; j++) {
                    const encryptedToken = encrypt(blindingFactor, nfts[j], connectedAccount)
                    if (encryptedToken === encodedNfts[i].toString()) {
                      if (!exposedNfts.find(e => e === nfts[j])) {
                        cards.push(nfts[j])
                      }
                    }
                  }
                }
                setCards(cards)
                setIsCardPackLoaded(true)
              }
              else {
                setPlayGameCta(<FormattedMessage id='global.playGame' />)
                if (nfts) {
                  cards = []
                  for (let i = 0; i < nfts.length; i++) {
                    cards.push(nfts[i])
                  }
                  setCards(cards)
                  setIsOwnedCardPackLoaded(true)
                }
              }
            })
          })
      }
    })
  }

  async function verifyCards(gameRoomId, blindingFactor) {
    await gameplayContract.methods.verifyPlayerCards(gameRoomId, blindingFactor).send({ from: connectedAccount })
  }

  async function loadConnectedWith(gameRoomId) {
    await gameplayContract.methods.checkMatchState(gameRoomId).call({ from: connectedAccount }).then(gameRoom => {
      if (gameRoom.winner === DEFAULT_ADDRESS) {
        const exposedNftPlayer1 = gameRoom.player1.exposedNfts[Number.parseInt(gameRoom.roundNo)]
        const exposedNftPlayer2 = gameRoom.player2.exposedNfts[Number.parseInt(gameRoom.roundNo)]
        setCurrentRound(Number.parseInt(gameRoom.roundNo) + 1)
        if (gameRoom.player1.walletAddress === connectedAccount) {
          setRoundsVerified(gameRoom.player1.cardsVerified)
          setConnectedTo(gameRoom.player2.walletAddress)
          exposedNftPlayer1 !== '0' && setMyCurrentExposedNft(exposedNftPlayer1)
          exposedNftPlayer2 !== '0' && setOpponentExposedNft(exposedNftPlayer2)
          setMyScore(gameRoom.player1.points)
          setOpponentScore(gameRoom.player2.points)
        }
        else {
          setRoundsVerified(gameRoom.player2.cardsVerified)
          setConnectedTo(gameRoom.player1.walletAddress)
          exposedNftPlayer2 !== '0' && setMyCurrentExposedNft(exposedNftPlayer2)
          exposedNftPlayer1 !== '0' && setOpponentExposedNft(exposedNftPlayer1)
          setMyScore(gameRoom.player2.points)
          setOpponentScore(gameRoom.player1.points)
        }
        if ((gameRoom.player1.walletAddress === connectedAccount && gameRoom.roundState === '0') ||
          (gameRoom.player2.walletAddress === connectedAccount && gameRoom.roundState === '1')) {
          setExecuteMove(true)
        }
        setCurrentExposedStat(gameRoom.currentExposedStat)
      }
      else {
        gameRoom.winner === connectedAccount.toString() ? setGameState(true) : setGameState(false)
      }
    })
  }

  useEffect(() => {
    if (userDetails && !userDetails.error) {
      showLoader()
      setConnectedAccount(userDetails.defaultAccount)
      loadWeb3()
      loadBlindingFactor()
    }
  }, [userDetails])

  useEffect(() => {
    if (nowggNFTContract && gameplayContract && nowggFTContract) {
      getBalance()
      loadCardPack()
      subscribeToEvents()
      currentGameRoomId && loadConnectedWith(currentGameRoomId)
      hideLoader()
    }
  }, [nowggNFTContract, gameplayContract, currentGameRoomId])

  async function registerPlayer() {
    await identityNftContract.methods
      .balanceOf(connectedAccount)
      .call({ from: connectedAccount })
      .then(async (val) => {
        if (val === '0') {
          await nowggMarketplaceContract.methods
            .registerUser()
            .send({ from: connectedAccount })
            .then((_) => window.location.reload())
          return
        }
        await nowggNFTContract.methods
          .getAllTokensByOwner()
          .call({ from: connectedAccount })
          .then(async (tokens) => {
            let encodedNfts = []
            for (let i = 0; i < tokens.length; i++) {
              encodedNfts.push(encrypt(blindingFactor, tokens[i], connectedAccount))
            }
            const gamePlayNetworkData = GamePlay.networks[networkId]
            await nowggFTContract.methods
              .approve(gamePlayNetworkData.address, ENTRY_FEE)
              .send({ from: connectedAccount })
              .then(async () => {
                await gameplayContract.methods
                  .registerPlayer(encodedNfts)
                  .send({ from: connectedAccount })
                  .then(async (_) => window.location.reload())
              })
          })
      })
  }

  function getStatByIndex(index) {
    if (index === '1') {
      return 'HP'
    } else if (index === '2') {
      return 'Attack'
    } else if (index === '3') {
      return 'Defense'
    } else if (index === '4') {
      return 'Special Attack'
    } else if (index === '5') {
      return 'Special Defense'
    } else if (index === '6') {
      return 'Speed'
    } else { return 'Round stat uninitilized' }
  }

  async function leaveGame(gameRoomId) {
    await gameplayContract.methods.triggerEndMatch(gameRoomId, connectedAccount).send({ from: connectedAccount }).then(_ => window.location.reload())
  }

  function renderUi() {
    const startVerification = StorageUtil.localStorage.get(STORAGE_KEYS.START_VERIFICATION) ?? false
    if (gameState !== GameState.UNDECIDED) {
      return <div className='game-result'>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: gameState === GameState.WON ? Winner : gameState === GameState.LOST ? Loser : Tie
          }}
          height={350}
          width={350}
        />
        <div className={`game-result-cta ${gameState === GameState.WON ? 'winner' : gameState === GameState.LOST ? 'loser' : 'tie'}`}>
          <FormattedMessage id={gameState === GameState.WON ? 'global.youWon' : gameState === GameState.LOST ? 'global.betterLuckNextTime' : 'global.matchTied'} />
        </div>
        <div className='new-game' onClick={_ => window.location.reload()}>
          <FormattedMessage id='global.newGame' />
        </div>
      </div>
    }
    else {
      return <>
        {
          !isCardPackLoaded && blindingFactor && <div className='register'>
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: Register
              }}
              height={350}
              width={350}
            />
            <div className='register-cta' onClick={registerPlayer}>{playgameCta}</div>
          </div>
        }
        {
          isCardPackLoaded && connectedTo && connectedTo !== DEFAULT_ADDRESS && !startVerification && <div className='my-cards'>
            <FormattedMessage id='global.myCurrentExposedStat' /> :&nbsp;
            {getStatByIndex(currentExposedStat)}
          </div>
        }
        {(myExposedNft || opponentExposedNft) && <div className='my-cards'><FormattedMessage id='global.currentExposedCards' /></div>}

        <div className='player-cards'>
          {
            myExposedNft && <PokemonCard
              card={myExposedNft}
              account={connectedAccount}
              contract={nowggNFTContract}
              gameRoomId={currentGameRoomId}
              showShimmer={true}
              currentExposedStat={currentExposedStat}
            />
          }
          {
            opponentExposedNft && <PokemonCard
              className={'opponent'}
              card={opponentExposedNft}
              account={connectedAccount}
              contract={nowggNFTContract}
              gameRoomId={currentGameRoomId}
              showShimmer={true}
              currentExposedStat={currentExposedStat}
            />
          }
          {isCardPackLoaded && connectedTo && connectedTo !== DEFAULT_ADDRESS
            && myScore && opponentScore && (startVerification === true || startVerification === false) &&
            <ScoreBoard
              myScore={myScore}
              opponentScore={opponentScore}
              isItYourTurn={executeMove}
              roundNo={currentRound}
              startVerification={startVerification}
              cardsVerified={roundsVerified}
              verifyCardsCallback={() => gameplayContract && blindingFactor && currentGameRoomId && currentGameRoomId !== '0' && verifyCards(currentGameRoomId, blindingFactor)}
            />}
        </div>
        {
          isCardPackLoaded && connectedTo && connectedTo !== DEFAULT_ADDRESS && !myExposedNft && !opponentExposedNft && <div className='err-msg'>
            <FormattedMessage id={cards.length > 0 ? 'global.noExposedCard' : 'global.allCardsExposed'} />
          </div>
        }
        {
          // eslint-disable-next-line jsx-control-statements/jsx-use-if-tag
          cards.length ? isCardPackLoaded ? <div className='my-cards'><FormattedMessage id='global.currentHand' /></div> : <div className='my-cards'><FormattedMessage id='global.myCards' /></div> : ''
        }
        {
          (isCardPackLoaded || isOwnedCardPackLoaded) && <div className='player-cards'>
            {
              connectedAccount && nowggNFTContract && cards.map((token, i) => <PokemonCard
                key={i.toString()}
                card={token}
                account={connectedAccount}
                contract={nowggNFTContract}
                gameRoomId={currentGameRoomId}
                currentExposedStat={currentExposedStat}
                exposeCard={connectedTo && connectedTo !== DEFAULT_ADDRESS && executeMove}
                onCardSelect={async (card, index, gameRoomId) => {
                  await gameplayContract.methods.executeMove(card, index, gameRoomId).send({ from: connectedAccount })
                }}
              />)
            }
          </div>
        }
      </>
    }
  }

  async function addGameMoney(amount) {
    await nowggMarketplaceContract.methods.addCurrency(amount).send({ from: connectedAccount }).then(_ => window.location.reload())
  }

  async function purchaseCards() {
    const nowggMarketPlaceNetworkData = NowggMarketPlace.networks[networkId]
    await nowggFTContract.methods
      .approve(nowggMarketPlaceNetworkData.address, CARD_PACK_PRICE)
      .send({ from: connectedAccount })
      .then(async _ => await nowggMarketplaceContract.methods.purchaseCards().send({ from: connectedAccount }).then(_ => window.location.reload()))
  }

  return connectedAccount && ethBalance && <div className='dashboard'>
    <div className='top-row'>
      <UserInfo account={connectedAccount} balance={ethBalance} gameMoney={gameMoney} symbol={currencySymbol} connectedTo={connectedTo} />
      <div className='marketplace'>
        <div className='section-1'>
          <div className='add-money'>
            <div className='title'>
              <img src={AddMoney} height={40} width={40} />
              <div className='add-money-cta'>
                <FormattedMessage id='global.addCurrency' />
              </div>
            </div>
            <div className='actions'>
              <input
                type="number"
                id="amount"
                className='amount'
                placeholder={'Amount'}
                onChange={(e) => {
                  amountToAdd = e.target.value
                  setAmountToAdd(amountToAdd)
                }
                }
              />
              <div className='add-cta' onClick={_ => nowggMarketplaceContract && amountToAdd && addGameMoney(amountToAdd)}>
                <FormattedMessage id='global.add' />
              </div>
            </div>
          </div>
        </div>
        <div className='section-2'>
          <div className='add-cards' onClick={_ => nowggMarketplaceContract && purchaseCards()}>
            <img src={AddCards} height={44} width={44} />
            <div className='add-cards-cta'>
              <FormattedMessage id='global.buyCards' />
            </div>
          </div>
          <div className='rules' onClick={_ => triggerPopup({
            id: DialogIds.RULES,
            children: <Rules />
          })} >
            <img src={RulesIcon} height={40} width={40} />
            <div className='rules-cta'>
              <FormattedMessage id='global.rules' />
            </div>
          </div>
        </div>
        {
          isCardPackLoaded && currentGameRoomId && gameplayContract && <div className='exit-game' onClick={() => leaveGame(currentGameRoomId)}>
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: Quit
              }}
              height={100}
              width={100}
            />
            <div className='info'>
              <div className='exit-cta'><FormattedMessage id='global.leaveGame' /></div>
              <div className='exit-cta-desc'><FormattedMessage id={connectedTo ? 'global.opponentGetsAll' : 'global.leaveGameDesc'} /></div>
            </div>
          </div>
        }
      </div>
    </div>
    {renderUi()}
  </div>
}


const mapStateToProps = (state) => {
  return {
    userDetailsSlice: state.userDetailsSlice,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserDetails: (_) => {
      dispatch(UserActions.getUserDetails())
    },
  }
}

const Dashboard = connect(mapStateToProps, mapDispatchToProps)(_Dashboard)
export default Dashboard
