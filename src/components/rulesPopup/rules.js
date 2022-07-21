import './rules.scss'
const Rules = () => {
  return <div className='rules'><div className='heading'>RULES</div>
    <ul>
      <li className='rule'>Player with more points wins in the end !</li>
      <li className='rule'>Load your card pack to play</li>
      <li className='rule'>Find an opponent ,post connection expose your card by clicking on one of the stats you want to use for tally</li>
      <li className='rule'>Once you transact ,winner gets a point and loser gets none</li>
      <li className='rule'>You can end and start a new game anytime (Either of the players must have greater points as compared to its opponent while finishing the game)</li>
      <li className='rule'>Don't forget to connect your metamask wallet before playing ! Enjoy :)</li>
    </ul>
  </div>
}
export default Rules