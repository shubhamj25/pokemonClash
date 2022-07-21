import React, {
  createContext,
  useReducer,
  useContext,
  useState,
} from 'react'
import FullScreenLoader from '../components/full_screen_loader/full_screen_loader'
import Popup from '../components/popup/popup'
import Snackbar, { SnackbarTypes } from '../components/snackbar/snackbar'

const CommonComponentsContext = createContext()

const PopupReducerActions = {
  ShowPopup: 'showPopup',
  HidePopup: 'hidePopup',
  HideAllPopups: 'hideAllPopups'
}

const PopupState = {
  children: null,
  className: '',
  onPopupClose: null,
  closeOnClickOutside: true,
  hideCloseIcon: false,
  closeIcon: null,
  shouldClosePopup: true
}

const Popups = {}
function PopupReducer(state = Popups, action) {
  const { id } = action.payload || {}
  switch (action.type) {
    case PopupReducerActions.ShowPopup:
      const {
        children = PopupState.children,
        className = PopupState.className,
        onPopupClose = PopupState.onPopupClose,
        closeOnClickOutside = PopupState.closeOnClickOutside,
        hideCloseIcon = PopupState.hideCloseIcon,
        closeIcon = PopupState.closeIcon,
        shouldClosePopup = PopupState.shouldClosePopup
      } = action.payload || {}

      // displayIndex shows the order in which popups have been opened, 
      // the popup opened first has displayIndex = 1 
      // the popup opened last has the highest displayIndex
      // the popup opened last also has isTopmost = true

      let _topmostPopupId = Object.keys(state).find(popupId => state[popupId].isTopmost),
        _topMostPopup = state[_topmostPopupId],
        _topmostPopupIndex = _topMostPopup ? _topMostPopup.displayIndex : 0

      const newPopup = {
        children,
        className,
        onPopupClose,
        closeOnClickOutside,
        hideCloseIcon,
        closeIcon,
        shouldClosePopup,
        isTopmost: true,
        displayIndex: _topmostPopupIndex + 1
      }

      let _newPopupState = {}

      // setting isTopmost = false for all previous popups
      Object.keys(state).forEach(popupId => {
        _newPopupState[popupId] = { ...state[popupId], ...{ isTopmost: false } }
      })

      return { ..._newPopupState, [id]: newPopup }

    case PopupReducerActions.HidePopup: {
      delete state[id]
      let _highestDisplayIndex = Math.max(Object.keys(state).map(popupId => state[popupId].displayIndex), 0)

      let _newPopupState = {}

      // setting isTopmost = true for the popup which will have the highest displayIndex after closing this popup
      Object.keys(state).forEach(popupId => {
        _newPopupState[popupId] = { ...state[popupId], ...{ isTopmost: state[popupId].displayIndex === _highestDisplayIndex } }
      })

      return _newPopupState
    }

    case PopupReducerActions.HideAllPopups:
      return Popups

    default:
      return { ...state }
  }
}

export const CommonComponentsProvider = ({ children }) => {
  const [popupState, dispatch] = useReducer(PopupReducer, {})
  const [snackbarData, setSnackbarData] = useState(null)
  const [loaderData, setLoaderData] = useState(null)

  const triggerPopup = ({
    children = null,
    className = '',
    onPopupClose = null,
    id,
    closeOnClickOutside,
    hideCloseIcon,
    closeIcon,
    shouldClosePopup // If false, it prevents popup from closing naturally (action for hidepopup won't be dispatched in this case)
  }) => {
    if (id) {
      dispatch({
        type: PopupReducerActions.ShowPopup,
        payload: {
          children,
          className,
          onPopupClose,
          closeOnClickOutside,
          hideCloseIcon,
          closeIcon,
          id,
          shouldClosePopup
        },
      })
    } else console.error('no popup id')
  }

  const hidePopup = (id, payload) => {
    let { onClickAway = false } = payload || {}
    const popupData = popupState[id]
    if (!popupData) {
      return
    }
    if (typeof popupData.onPopupClose === 'function') {
      popupData.onPopupClose()
    }

    // When hidePopup has been called through the ClickAwayListener, we only close the popup which is at the top
    if (!(onClickAway && !popupData.isTopmost) && popupData.shouldClosePopup) {
      dispatch({
        type: PopupReducerActions.HidePopup,
        payload: {
          id,
        },
      })
    }
  }

  const hideAllPopups = () => {
    dispatch({
      type: PopupReducerActions.HideAllPopups,
    })
  }

  const showSnackbar = ({
    children = null,
    type = SnackbarTypes.success,
    duration = 3000,
  }) => {
    setSnackbarData({
      children,
      type,
      duration,
    })
  }

  const hideSnackbar = () => {
    setSnackbarData(null)
  }

  const showLoader = (data) => {
    const { children = null, text = null } = data || {}
    setLoaderData({
      children,
      text,
    })
  }

  const hideLoader = () => {
    setLoaderData(null)
  }

  let { type, children: snackbarChild, duration } = snackbarData || {}

  let { children: loaderChild, text } = loaderData || {}

  return (
    <CommonComponentsContext.Provider
      value={{
        triggerPopup,
        hidePopup,
        hideAllPopups,
        showSnackbar,
        hideSnackbar,
        showLoader,
        hideLoader,
      }}
    >
      {Object.entries(popupState).map(([id, popupData]) => {
        const {
          children: PopupChildren,
          className,
          closeOnClickOutside,
          hideCloseIcon,
          closeIcon,
          onPopupClose,
        } = popupData || {}
        return (
          <Popup
            key={id}
            className={className}
            hidePopup={hidePopup}
            popupId={id}
            onPopupClose={onPopupClose}
            closeOnClickOutside={closeOnClickOutside}
            hideCloseIcon={hideCloseIcon}
            closeIcon={closeIcon}
          >
            {PopupChildren}
          </Popup>
        )
      })}
      {snackbarData && (
        <Snackbar type={type} duration={duration} hideSnackbar={hideSnackbar}>
          {snackbarChild}
        </Snackbar>
      )}
      {loaderData && (
        <FullScreenLoader text={text}>{loaderChild}</FullScreenLoader>
      )}
      {children}
    </CommonComponentsContext.Provider>
  )
}

export const useCommonComponents = () => useContext(CommonComponentsContext)
