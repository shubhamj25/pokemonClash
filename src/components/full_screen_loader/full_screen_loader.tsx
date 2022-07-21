import { injectIntl } from 'react-intl'
import './full_screen_loader.scss'
import Lottie from 'react-lottie'
import Pokeball from '../../lottie/pokemon.json'

const FullScreenLoader = () => {
  return (
    <div className="loader">
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: Pokeball,
        }}
        height={100}
        width={100}
      />
    </div>
  )
}

export default injectIntl(FullScreenLoader)
