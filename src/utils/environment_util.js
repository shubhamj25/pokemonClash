const EnvironmentUtil = {
  isProd: () => {
    return process.env.REACT_APP_ENV === 'prod'
  },
  isLocal: () => {
    return process.env.REACT_APP_ENV === 'local'
  }
}

export default EnvironmentUtil