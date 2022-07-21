import { useEffect, useState } from 'react'
import './card.scss'
const Card = ({ card, contract, onCardSelect, account }) => {
  const [cardData, setCardData] = useState()

  async function loadCardData() {
    let base64Data
    contract && await contract.methods.tokenURI(card).call({ from: account }).then((data) => {
      base64Data = data
    })
    //console.log(Buffer.from(base64Data, 'base64').toString())
    setCardData(JSON.parse(Buffer.from(base64Data, 'base64').toString()))
  }

  useEffect(() => {
    loadCardData()
  }, [])

  const _stat = (key, value, index) => {
    return <div className={`stat ${key}`} key={index} onClick={() => onCardSelect && onCardSelect(card, index)}>
      <div className='key'>{key}</div>
      <div className='value'>{value}</div>
    </div>
  }

  // eslint-disable-next-line jsx-control-statements/jsx-use-if-tag
  return cardData ? <div className='pokemon-card'>
    <div className='categories'>
      <div className='pokemon-type'>{cardData.type[0]}</div>
      {cardData.type[1] && <div className='pokemon-type'>{cardData.type[1]}</div>}
    </div>
    <div className='img'>
      <img src={cardData.image_data} />
    </div>
    <div className='name'>{cardData.name}</div>
    <div className='stats'>
      {cardData && cardData.attributes.map((data, index) => _stat(data.trait_type, data.value, index))}
    </div>
  </div> : ''
}
export default Card