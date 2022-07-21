/* eslint-disable jsx-control-statements/jsx-use-if-tag */
import { FC, ReactNode } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import { DialogIds } from '../../constants/dialogs'
import Cross from '../../images/ic_cross_with_white_bg'
import './popup.scss'

interface PopupProps {
  children?: ReactNode
  className?: string
  hidePopup: Function
  popupId: DialogIds
  closeOnClickOutside?: boolean
  hideCloseIcon?: boolean
  closeIcon?: ReactNode
}

const Popup: FC<PopupProps> = (props: PopupProps) => {
  const { children = null, className = '', hidePopup, popupId, closeOnClickOutside = true, hideCloseIcon = false, closeIcon } = props
  const handleClickAway = () => {
    if (closeOnClickOutside) {
      hidePopup(popupId, { onClickAway: true })
    }
  }
  return (
    <div className={`popup-overlay ${className}`}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className={'popup'}>
          {hideCloseIcon ? (
            ''
          ) : (
            <div
              className="close-icon"
              onClick={() => {
                hidePopup(popupId)
              }}
            >
              {closeIcon || <Cross />}
            </div>
          )}
          {children}
        </div>
      </ClickAwayListener>
    </div>
  )
}

export default Popup
