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
      loading: false,
      email: this.props.location.state ? (this.props.location.state.email || '') : '',
      password: this.props.location.state ? (this.props.location.state.password || '') : ''
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
    fetch('https://young-anchorage-24773.herokuapp.com/signin', {
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      method: "POST",
      body: JSON.stringify({email: email, password: password})
    })
      .then(res => res.json())
      .then(res => {
        if (res.code === 200) {
          // Write the jwt token in the localstorage
          localStorage.setItem('token', res.token)
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
        this.setState(() => ({
          loginError: true,
          errorMessage: err.message
        }))
      })
  }

  handleFormSubmit = (data) => {
    this.setState(() => ({
      loading: true
    }), this.logUserIn(data))
  }

  closeButtons = () => {
    this.setState({loginError: false})
  }

  render() {
    if (!!this.state.redirect) {
      const redirectTo = this.props.location.state ? this.props.location.state.from : '/'
      return (
        <Route
          render={(props) => <Redirect to={{pathname: redirectTo === '/signup' ? '/dashboard' : redirectTo}} />}
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
            <LoginForm
              handleLogin={this.handleFormSubmit}
              email={this.state.email}
              password={this.state.password}
              loginError={this.state.loginError}
            />
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