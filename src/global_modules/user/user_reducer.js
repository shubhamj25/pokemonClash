
let initialState = {
  userDetails: null,
  sessionData: null // sessionData holds all those values which need to be persisted till page is refreshed
}

let userDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_DETAILS': {
      return { ...state, userDetails: { ...state.userDetails, ...action.payload, error: null } }
    }
    case 'SET_USER_DETAILS_ERROR': {
      return { ...state, userDetails: { error: action.payload } }
    }
    case 'CLEAR_USER_DETAILS': {
      return { ...state, userDetails: null }
    }
    case 'SET_SESSION_DATA': {
      return { ...state, sessionData: {...state.sessionData, ...action.payload} }
    }
    default:
      return { ...state }
  }
}

export default userDetailsReducer
