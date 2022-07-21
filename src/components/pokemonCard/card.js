import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import RoboHash from 'react-robohash'

import './card.scss'
const PokemonCard = ({ className = '', card, contract, gameRoomId, onCardSelect, account, exposeCard = false, currentExposedStat, showShimmer = false }) => {
  const [cardData, setCardData] = useState()

  async function loadCardData() {
    let base64Data
    contract && await contract.methods.tokenURI(card).call({ from: account }).then((data) => {
      base64Data = data
    })
    setCardData(JSON.parse(Buffer.from(base64Data, 'base64').toString()))
  }

  useEffect(() => {
    loadCardData()
  }, [])

  const _stat = (key, value, index) => {
    return <div className={`stat ${key} ${exposeCard ? (currentExposedStat && currentExposedStat !== '0' ? currentExposedStat === (index + 1).toString() && 'clickable animated' : 'clickable') : currentExposedStat && currentExposedStat !== '0' && currentExposedStat === (index + 1).toString() && showShimmer && 'shimmer'} ${className} `} key={index} onClick={() => {
      onCardSelect && exposeCard && gameRoomId && (currentExposedStat && currentExposedStat !== '0' ? currentExposedStat === (index + 1).toString() : true) && onCardSelect(card, currentExposedStat && currentExposedStat !== '0' ? currentExposedStat : (index + 1).toString(), gameRoomId)
    }
    }>
      <div className='key'>{key}</div>
      <div className='value'>{value}</div>
    </div>
  }

  // eslint-disable-next-line jsx-control-statements/jsx-use-if-tag
  return cardData ? <div className={`pokemon-card ${className}`}>
    <div className='categories'>
      <div className={`pokemon-type ${className}`}>{cardData.type[0]}</div>
      {cardData.type[1] && <div className={`pokemon-type ${className}`}>{cardData.type[1]}</div>}
    </div>
    <div className='img'>
      <img src={cardData.image_data} />
    </div>
    <div className={`name ${className}`}>{cardData.name}</div>
    <div className='account-info'><RoboHash name={account} fileType='svg' gravatar type={'head'} size={24} className={`avatar ${className}`} />
      <div className='account'>
        <div className={`number ${className}`}>{account}</div>
        <div className={`tag ${className}`}>(<FormattedMessage id={className === 'opponent' ? 'global.opponent' : 'global.me'} />)</div>
      </div>
    </div>
    <div className='stats'>
      {cardData && cardData.attributes.map((data, index) => _stat(data.trait_type, data.value, index))}
    </div>
  </div> : ''
}
export default PokemonCard