import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import LoginForm from './LoginForm'


const ErrorLoggingIn = (props) => (
  <div className="Error-signing-in container alert alert-warning alert-dismissible fade show" role="alert">
    <strong>Holy guacamole! {props.errorMessage || "Errors aren't welcomed, so check the details you entered or your network."}</strong> 
    <button type="button" className="close" aria-label="Close">
      <span aria-hidden="true" onClick={props.close}>&times;</span>
    </button>
  </div>
)

class LoginPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loginError: false,
      loading: false
    }
  }

  static propTypes = {
    authed: PropTypes.bool,
    changeAuthState: PropTypes.func
  }

  loadingMode = () => {
    this.setState(() => ({
      loading: true
    }))
  }

  logUserIn = ({email, password}) => {
    // Send data to backend
    // If user is authed, add jwt to the localstorage
    // then redirect to the referral
    // Else, show an error
    // console.log('To be fixed before tomorrow')
    fetch('https://young-anchorage-24773.herokuapp.com/signin', {
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      method: "POST",
      // mode: 'cors',
      body: JSON.stringify({email: email, password: password})
    })
      .then(res => res.json())
      .then(res => {
        console.log('User data:', res)
        if (res.status === 200) {
          // Write the hash of the user email in the localstorage
          const newHash = btoa(res.userId)
          localStorage.setItem('token', newHash)
          this.setState(() => ({
            loginError: false,
            redirect: true
          }))
        } else {
          this.setState(() => ({
            loginError: true,
            errorMessage: res.message
          }))
        }
      })
      .catch(err => {
        console.log(err)
        this.setState(() => ({
          loginError: true,
          errorMessage: err.message
        }))
      })
  }

  handleFormSubmit = (data) => {
    // Log 
    console.log(data.email, data.password)
    this.setState(() => ({
      loading: true
    }), this.logUserIn(data))
  }

  closeButtons = () => {
    this.setState({loginError: false})
  }

  render() {
    if (!!this.state.redirect) {
      return (
        <Route
          render={(props) => <Redirect to={{pathname: this.props.location.state.from.pathname}} />}
        />
      )
    } else {
      return (
        <div className="Login-page">
          <div className="Login-page__content">
            <h3 className="text-center" style={{color: '#125266'}}>Hey! Good to see you again!</h3>
            <div className="text-center" style={{marginTop: '-5px', marginBottom: '15px'}}>
              <small style={{color: '#125266'}}>Sign in to get going</small>
            </div>
            {this.state.loginError && <ErrorLoggingIn errorMessage={this.state.errorMessage} close={this.closeButtons} />}
            <LoginForm handleLogin={this.handleFormSubmit} />
            <div className="text-center" style={{marginTop: '5px'}}>
              <span style={{fontSize: 'smaller'}}>New here? <Link to="/signup">Sign up</Link> now</span>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default LoginPage




// TODO FOR SIGNUP AND SIGN IN
// - Send the data to the backend
// - based on the response, set the error state and message accordingly to the user
// - If no error, redirect user to the page they were coming from
// - Remember to store user auth state in localStorae, and to fetch from there everytime in a private route
// - Work on the protected route for the Fill Survey Page