import React, { Component } from 'react'
import {Route, Redirect} from 'react-router-dom'
import GoogleLogin from 'react-google-login'

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false
    }
  }

  render() {
    const google_app_key = process.env.REACT_APP_GOOGLE_CLIENT_ID

    const handleLoginFailure = (response) => {
      console.log('Failed:', response);
    }

    const handleLoginSuccess = (response) => {
      console.log(response)
      const {email, name, googleId} = response.profileObj
      // Send it to backend for authentication
      // Get the users details from backend, and store it in state
      // Save a token and user email in localStorage
      // Then redirect to the from param in the props
      fetch('/authenticate', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({"user": {email, name, authToken: googleId.slice(0,20)}})
      })
        .then(res => res.json())
        .then(res => {
          console.log(res)
          if (res.code === '200') {
            const user = res.data
            console.log(user)
            // const user = {
            //   email: "bellokuba.rak0@gmail.com",
            //   name: "Mubarak Bello",
            //   authToken: "10424003565234584970"
            // }
            localStorage.setItem('token', user.authToken)
            localStorage.setItem('a', 'b')
            this.setState({
              ...this.state,
              redirect: true
            })
          } else {
            console.log("Code not 200")
          }
        })
        .catch(err => {
          console.log(err)
          this.setState({
            ...this.state,
            error: true
          })
        })
    }

    if (!!this.state.redirect) {
      return (
        <Route
          render={(props) => <Redirect to={{pathname: this.props.location.state.from.pathname}} />}
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