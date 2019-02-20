import React, { Component } from 'react'
import {Route, Redirect} from 'react-router-dom'
import GoogleLogin from 'react-google-login'
import base64 from 'base64-js'

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const google_app_key = process.env.REACT_APP_GOOGLE_CLIENT_ID

    const handleLoginFailure = (response) => {
      console.log('Failed:', response);
    }

    const handleLoginSuccess = (response) => {
      console.log(response)
      // Send it to backend for authentication
      // Get the users details from backend, and store it in state
      // Save a token and user email in localStorage
      // Then redirect to the from param in the props
      fetch('/login')
        .then(res => {
          console.log(res)
          const user = {
            email: "bellokuba.rak0@gmail.com",
            name: "Mubarak Bello",
            authToken: "104240035652345849706"
          }
          localStorage.setItem('userToken', {
            email: base64.toByteArray(user.email),
            authToken: base64.toByteArray(user.authToken)
          })
          this.setState({
            ...this.state,
            redirect: true
          })
        })
        .catch(err => {
          console.log(err)
          const user = {}
          this.setState({
            ...this.state,
            error: true
          })
        })
    }

    if (!!this.state.redirect) {
      return (
        <Route
          render={(props) => <Redirect to={{pathname: this.props.location.from}} />}
        />
      )
    } else {
      return (
        <div style={{"textAlign": "center", "fontSize": "20px"}}>
          <h1>LOGIN WITH FACEBOOK AND GOOGLE</h1>
          <GoogleLogin
            clientId = {google_app_key}
            buttonText = "LOGIN WITH GOOGLE"
            onSuccess = {handleLoginSuccess}
            onFailure = {handleLoginFailure}
          />
        </div>
      );
    }
  }
}

export default LoginPage