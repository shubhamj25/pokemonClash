/* eslint-disable jsx-control-statements/jsx-use-if-tag */
import { FormattedMessage } from 'react-intl'
import './scoreboard.scss'
import Lottie from 'react-lottie'
import Trophy from '../../../lottie/trophy.json'
const ScoreBoard = ({ myScore, opponentScore, isItYourTurn = false, roundNo, cardsVerified = false, verifyCardsCallback, startVerification = false }) => {
  return <div className='score-board'>
    <div className='title'><FormattedMessage id='global.scoreboard' /></div>
    {startVerification === false && <div className='subtitle'><FormattedMessage id={isItYourTurn ? 'global.yourTurn' : 'global.waitingForOpponentMove'} /></div>}
    <div className='scores'>
      <div className='score'>
        <div className='tag'><FormattedMessage id='global.me' /></div>
        {myScore}</div>
      <div className='score'>
        <div className='tag'><FormattedMessage id='global.opponent' /></div>
        {opponentScore}</div>
    </div>
    {roundNo === 6 && !cardsVerified && startVerification ? <div className='verify-cards' onClick={_ => verifyCardsCallback && verifyCardsCallback()}>
      <FormattedMessage id='global.verifyCards' />
    </div> : <div className='round-no'>
      {roundNo === 6 ? < div ><FormattedMessage id={!cardsVerified ? 'global.waitingForVerificationTurn' : 'global.waitingForOpponentToVerifyCards'} /></div> : <div><FormattedMessage id='global.round' />&nbsp;{roundNo}</div>}
      <div className={`round-no-subtitle ${cardsVerified && 'verified'}`}><FormattedMessage id={cardsVerified ? 'global.cardsVerified' : 'global.cardsUnverified'} /></div>
    </div>}
    <div className='desc'>
      <FormattedMessage id='global.scoreboardDesc' />
    </div>
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: Trophy
      }}
      height={150}
      width={300}
    />
  </div>
}

export default ScoreBoard