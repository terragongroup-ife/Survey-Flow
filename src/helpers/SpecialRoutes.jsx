import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import jwt from 'jsonwebtoken'

const secret_key = process.env.REACT_APP_JWT_SECRET_KEY

const checkAuth = () => {
  // Get the token from the local storage
  const token = localStorage.getItem('token')
  let user_data, isLoggedIn = !!token
  
  // If there is a token, check its validity and get its data
  if (token) {
    try {
      user_data = jwt.verify(token, secret_key)
      isLoggedIn = true
    } catch (error) {
      isLoggedIn = false
    }
  }
  return {isLoggedIn, data: user_data}
}

const PrivateRoute = ({component: Component, ...rest}) => {
  // Check auth status
  const {isLoggedIn, data} = checkAuth()
  return (
    <Route
      {...rest}
      render={(props) => {
        return (isLoggedIn
        ? <Component user={data} {...props} {...rest} />
        : <Redirect to={{pathname: '/login', state: {from: props.location.pathname}}} />)
      }}
    />
  )
}

const PublicRoute = ({component: Component, ...rest}) => {
  const {isLoggedIn} = checkAuth()
  return (
    <Route
      {...rest}
      render={(props) => !isLoggedIn
        ? <Component {...props} {...rest} />
        : <Redirect to='/' />
      }
    />
  )
}

export {PrivateRoute, PublicRoute, checkAuth}