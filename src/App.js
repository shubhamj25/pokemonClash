import { connect, Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import LocaleProvider from './LocaleProvider'
import { CommonComponentsProvider } from './providers/common_components_provider'
import RouteWrapper from './route_wrapper'
import { store } from './store'
function App() {
  return (
    <LocaleProvider>
      <Provider store={store}>
        <Router>
          <CommonComponentsProvider>
            <AppWrapper />
          </CommonComponentsProvider>
        </Router>
      </Provider>
    </LocaleProvider>
  )
}

export default App

const _AppWrapper = props => {
  return <RouteWrapper />
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

const AppWrapper = connect(mapStateToProps, mapDispatchToProps)(_AppWrapper)
