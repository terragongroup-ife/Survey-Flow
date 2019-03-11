import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = ({component: Component, ...rest}) => {
  // Get the token from the local storage
  return (
    <Route
      {...rest}
      render={(props) => localStorage.getItem('token')
        ? <Component user={atob(localStorage.getItem('token'))} {...props} {...rest} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />
      }
    />
  )
}

const PublicRoute = ({component: Component, authed, ...rest}) => (
  <Route
    {...rest}
    render={(props) => (!localStorage.getItem('token'))
      ? <Component {...props} {...rest} />
      : <Redirect to='/' />
    }
  />
)

export {PrivateRoute, PublicRoute}