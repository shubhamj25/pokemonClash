import STORAGE_KEYS from '../../constants/storage_keys'
import StorageUtil from '../../utils/storage'
import UserRepository from './user_repository'

const UserActions = {
  getUserDetails: () => {
    return async (dispatch) => {
      try {
        let response = await UserRepository.getUserDetails()
        if (response && response.error) {
          dispatch(UserActions.setUserDetailsError(response.error))
        } else {
          let _userId = response.defaultAccount
          StorageUtil.localStorage.set(STORAGE_KEYS.CONNECTED_ACCOUNT, _userId)
          dispatch(UserActions.setUserDetails(response))
        }
      } catch (e) {
        dispatch(UserActions.setUserDetailsError(e))
      }
    }
  },

  setUserDetails: (userDetails) => {
    return {
      type: 'SET_USER_DETAILS',
      payload: userDetails,
    }
  },

  setUserDetailsError: (error) => {
    return {
      type: 'SET_USER_DETAILS_ERROR',
      payload: error,
    }
  },

  clearUserDetails: () => {
    return {
      type: 'CLEAR_USER_DETAILS',
    }
  },

  setSessionData: (data) => {
    return {
      type: 'SET_SESSION_DATA',
      payload: data,
    }
  },

  createIdentityNft: () => {
    console.log('inside creadeIdentity NFt')
    return async (dispatch) => {
      try {
        let response = await UserRepository.createIdentityNft()
        console.log('response:::', response)
        if (response && response.error) {
          alert('Something went wrong')
        } else {
          alert(`${response.message}`)
        }
      } catch (e) {
        throw Error(e)
      }
    }
  },
}

export default UserActions
