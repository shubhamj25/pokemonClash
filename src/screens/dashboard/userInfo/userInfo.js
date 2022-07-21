import { FormattedMessage } from 'react-intl'
import RoboHash from 'react-robohash'
import { SnackbarTypes } from '../../../components/snackbar/snackbar'
import './userInfo.scss'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useCommonComponents } from '../../../providers/common_components_provider'
import { DEFAULT_ADDRESS } from '../../../constants/constants'

const UserInfo = ({ account, balance, gameMoney, symbol, connectedTo }) => {
  const { showSnackbar } = useCommonComponents()

  function getCopiableAccountId() {
    return <CopyToClipboard
      text={account}
      onCopy={_ => showSnackbar({
        children: <div className='snackbar-text'>
          <FormattedMessage id={'global.accountCopied'} />
        </div>,
        type: SnackbarTypes.success,
      })
      }
    >
      <div className='title-content'>
        {account}
      </div>
    </CopyToClipboard>
  }

  return <div className='user-info'>
    <RoboHash name={account} fileType='svg' gravatar type={'head'} size={85} className={'avatar'} />
    <div className='tile'>
      <div className='title'>Account : {getCopiableAccountId()}
      </div>
      <div className='sub-title'>Balance : <div className='subtitle-content'>{balance} ETH</div></div>
      <div className='sub-title'>Game Money : <div className='subtitle-content'>{gameMoney} {symbol}</div>
      </div>
      <div className='sub-title'>Playing with : <div className='subtitle-content'>{connectedTo && (connectedTo === DEFAULT_ADDRESS ? 'Nobody' : connectedTo)}</div>
      </div>
    </div>
  </div>
}

export default UserInfo