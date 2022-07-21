import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ROUTES } from './constants/routes'
import RouteHoc from './global_modules/route_hoc/route_hoc'
import Dashboard from './screens/dashboard/dashboard'

class RouteWrapper extends Component {
  render() {
    return (
      <Routes>
        <Route
          exact
          path={ROUTES.DASHBOARD}
          element={<RouteHoc childComponent={<Dashboard />} />}
        />
      </Routes>
    )
  }
}

export default RouteWrapper
