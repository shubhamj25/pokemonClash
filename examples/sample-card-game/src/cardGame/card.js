import './card.scss'
import { getCardNumber, getSuit } from './config'
const Card = ({ number, suit , onCardSelect }) => {
  return <div className='gambling-card' onClick={() => onCardSelect && onCardSelect(number,suit)}>
    <div className='row-1'>
      <div className='card-no'>{getCardNumber(number)}</div>
      <div className='card-suit'>{getSuit(suit)}</div>
    </div>
    <div className='row-2'>
      {getSuit(suit)}
      {getSuit(suit)}
    </div>
  </div>
}
export default Card