import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'
import SignupForm from './SignupForm'


const ErrorSigningUp = (props) => (
  <div className="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>Holy guacamole!</strong> {props.errorMessage || "Errors aren't welcomed, so check the details you entered or your network."}
    <button type="button" className="close" aria-label="Close">
      <span aria-hidden="true" onClick={props.close}>&times;</span>
    </button>
  </div>
)

class SignupPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      signupError: false,
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

  signUserUp = ({fullName, email, password}) => {
    // Send data to backend
    // If user is authed, add jwt to the localstorage
    // then redirect to the referral
    // Else, show an error
    fetch('https://young-anchorage-24773.herokuapp.com/signup', {
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      method: "POST",
      body: JSON.stringify({email: email, password: password, name: fullName})
    })
      .then(res => res.json())
      .then(res => {
        console.log('User data:', res)
        if (res.code === 201) {
          this.setState(() => ({
            signupError: false,
            redirect: true,
            email,
            password
          }))
        } else {
          this.setState(() => ({
            signupError: true,
            errorMessage: res.message,
            redirect: false
          }))
        }
      })
      .catch(err => {
        console.log(err)
        this.setState(() => ({
          signupError: true,
          errorMessage: err.message
        }))
      })
  }

  handleFormSubmit = (data) => {
    // Log 
    if (data.password !== data.repeatPassword) {
      this.setState(() => ({
        signupError: true,
        errorMessage: 'Passwords do not match'
      }))
    } else if (data.password.length < 6) {
      this.setState(() => ({
        signupError: true,
        errorMessage: 'Password should\n not be less than 6 characters'
      }))
    } else {
      console.log(data.fullName, data.email, data.password)
      this.setState(() => ({
        loading: true
      }), this.signUserUp(data))
    }
  }

  closeButtons = () => {
    this.setState({signupError: false})
  }

  render() {
    if (!!this.state.redirect) {
      return (
        <Route
          render={(props) => <Redirect to={{
            pathname: '/login',
            state: {
              from: '/signup',
              email: this.state.email,
              password: this.state.password
            }
          }} />}
        />
      )
    } else {
      return (
        <div className="Signup-page">
          <div className="Signup-page__content">
            <h3 className="text-center" style={{color: '#125266'}}>Hey! Nice to have you here</h3>
            <div className="text-center" style={{marginTop: '-5px', marginBottom: '15px'}}>
              <small style={{color: '#125266'}}>Sign up to continue</small>
            </div>
            {this.state.signupError && <ErrorSigningUp errorMessage={this.state.errorMessage} close={this.closeButtons} />}
            <SignupForm handleSignup={this.handleFormSubmit} signupError={this.state.signupError} />
            <div className="text-center" style={{marginTop: '5px'}}>
              <span style={{fontSize: 'smaller'}}>Already have an account? <Link to="/login">Sign in</Link> now</span>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default SignupPage