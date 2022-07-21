/* eslint-disable jsx-control-statements/jsx-use-if-tag */
import './login.scss'
import Wallet from '../../lottie/lottie-wallet.json'
import Lottie from 'react-lottie'
import MetamaskIcon from '../../images/metamask.svg'
import ArrowRight from '../../lottie/swipe-right.json'
import { useEffect, useState } from 'react'
import { useCommonComponents } from '../../providers/common_components_provider'
import { FormattedMessage } from 'react-intl'
import { SnackbarTypes } from '../../components/snackbar/snackbar'
import { METAMASK_DOWNLOAD_LINK } from '../../constants/constants'

const Login = () => {
  const { showSnackbar } = useCommonComponents()
  const [subtitle, setSubtitle] = useState(<FormattedMessage id={'global.loginSubtitle'} />)
  function isMetamaskInstalled() {
    if (!window.ethereum) {
      showSnackbar({
        children: <div className='snackbar-text'><FormattedMessage id={'errors.metamaskNotInstalled'} /></div>,
        type: SnackbarTypes.error,
      })
      setSubtitle(<FormattedMessage id={'global.loginSubtitleNoMetamask'} />)
      return false
    }
    return true
  }
  async function ctaAction() {
    if (isMetamaskInstalled()) {
      await window.ethereum.request({
        method: 'eth_requestAccounts'
      }).then(_ => window.location.reload())
    }
    else {
      window.open(METAMASK_DOWNLOAD_LINK) 
    }
  }
  useEffect(() => {
    isMetamaskInstalled()
  }, [])
  return <div className='login'>
    <div className='content'>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: Wallet
        }}
        height={250}
        width={250}
      />
      <div className='cta' onClick={ctaAction}>
        <img src={MetamaskIcon} height={64} width={64} />
        <div className='tile'>
          <div className='title'>
            <FormattedMessage id={'global.loginTitle'} />
          </div>
          <div className='subtitle'>{subtitle}</div>
        </div>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: ArrowRight
          }}
          height={100}
          width={100}
        />
      </div>
    </div>
  </div>
}

export default Login