import React, {Component} from 'react'
import PropTypes from 'prop-types'

class SignupForm extends Component {

  constructor(props) {
    super(props)
    // Initial state declaration
    this.state = {
      fullName: this.props.name || '',
      email: this.props.email || '',
      password: this.props.password || '',
      repeatPassword: ''
    }
  }

  static propTypes = {
    handleSignup: PropTypes.func
  }

  handleFullNameChange = (fullName) => {
    this.setState(() => ({
      fullName
    }))
  }

  handleEmailChange = (email) => {
    this.setState(() => ({
      email
    }))
  }

  handlePasswordChange = (password) => {
    this.setState(() => ({
      password
    }))
  }

  handleRepeatPasswordChange = (repeatPassword) => {
    this.setState(() => ({
     repeatPassword
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleSignup(this.state)
  }

  render() {
    return (
      <div className="Signup-form">
        <form onSubmit={this.handleSubmit}>
          <div className="form-label-group">
            <input
              type="text"
              className="form-control"
              id="name" required
              placeholder='Full name'
              value={this.state.fullName}
              onChange={({target: {value}}) => this.handleFullNameChange(value)}
            />
            <label htmlFor="name" style={{color: '#125266'}}>Full name</label>
          </div>
          <div className="form-label-group">
            <input
              type="email"
              className="form-control"
              id="email" required
              placeholder='Enter email'
              aria-describedby="emailHelp"
              value={this.state.email}
              onChange={({target: {value}}) => this.handleEmailChange(value)}
            />
            <label htmlFor="email" style={{color: '#125266'}}>Email address</label>
          </div>
          <div className="form-label-group">
            <input
              type="password"
              className="form-control"
              id="password" required
              placeholder="Password"
              value={this.state.password}
              onChange={({target: {value}}) => this.handlePasswordChange(value)}
            />
            <label htmlFor="password" style={{color: '#125266'}}>Password</label>
          </div>
          <div className="form-label-group">
            <input
              type="password"
              className="form-control"
              id="repeat-password" required
              placeholder="Repeat password"
              value={this.state.repeatPassword}
              onChange={({target: {value}}) => this.handleRepeatPasswordChange(value)}
            />
            <label htmlFor="repeat-password" style={{color: '#125266'}}>Repeat Password</label>
          </div>
          <button type="submit" className="btn btn-custom">Sign up</button>
        </form>
      </div>
    )
  }
}

export default SignupForm