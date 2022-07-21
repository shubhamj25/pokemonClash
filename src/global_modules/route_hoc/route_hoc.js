/* eslint-disable jsx-control-statements/jsx-use-if-tag */
import { connect } from 'react-redux'
import UserActions from '../user/user_actions'
import { useEffect, useState } from 'react'
import Login from '../../screens/login/login'

const _RouteHoc = ({ childComponent, userDetailsSlice, getUserDetails, createIdentityNft }) => {
  const [isFetchingWalletDetails, setIsFetchingWalletDetails] = useState(false)
  const { userDetails } = userDetailsSlice || {}
  async function fetchWalletDetails() {
    await getUserDetails()
  }

  useEffect(() => {
    fetchWalletDetails()
  }, [])

  useEffect(() => {
    if (userDetails && !userDetails.error) {
      setIsFetchingWalletDetails(false)
      //createIdentityNft()
    }
    else if ((userDetails && userDetails.error) || !window.ethereum) {
      setIsFetchingWalletDetails(true)
    }
  }, [userDetails])

  return isFetchingWalletDetails ? <Login /> : childComponent
}

const mapStateToProps = (state) => {
  return {
    userDetailsSlice: state.userDetailsSlice,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserDetails: async (_) => {
      dispatch(UserActions.getUserDetails())
    },
    createIdentityNft: () => {
      dispatch(UserActions.createIdentityNft())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(_RouteHoc)
