import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import freeze from 'redux-freeze'
import logger from 'redux-logger'
import promise from 'redux-promise-middleware'
import thunk from 'redux-thunk'
import userDetailsReducer from './global_modules/user/user_reducer'

const reducers = combineReducers({
  userDetailsSlice: userDetailsReducer,
})

/**
 *  This defines base configuration for setting up redux with react.
 *  All the middlewares are defined here and base store is created for provider.
 */

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let middlewares = []

//for promises, since we are using smart contract for transaction calls
middlewares.push(promise)

//for async operations
middlewares.push(thunk)

//smart console logging of actions
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger)
}

// add freeze dev middleware
// this prevents state from being mutated anywhere in the app during dev
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(freeze)
}

// apply middlewares
let middleware = applyMiddleware(...middlewares)

// create store
const store = createStore(reducers, composeEnhancers(middleware))
window.store = store

// export
export { store }
