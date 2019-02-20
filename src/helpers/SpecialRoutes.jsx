import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = ({component: Component, authed, ...rest}) => {
  // Get the token from the local storage
  // Send it to the backend for verification
  // Backend sends okay to verify
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component authed={authed} {...props} {...rest} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />
      }
    />
  )
}

const PublicRoute = ({component: Component, authed, ...rest}) => (
  <Route
    {...rest}
    render={(props) => authed === false
      ? <Component {...props} {...rest} />
      : <Redirect to='/' />
    }
  />
)

export {PrivateRoute, PublicRoute}