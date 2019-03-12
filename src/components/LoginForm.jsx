import React, {Component} from 'react'
import PropTypes from 'prop-types'

class LoginForm extends Component {

  constructor(props) {
    super(props)
    // Initial state declaration
    this.state = {
      email: this.props.email || '',
      password: this.props.password || ''
    }
  }

  static propTypes = {
    handleLogin: PropTypes.func,
    email: PropTypes.string,
    password: PropTypes.string
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

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.state.email !== '' && this.state.password !== '') {
      this.props.handleLogin(this.state)
    }
  }

  render() {
    return (
      <div className="Login-form">
        <form onSubmit={this.handleSubmit}>
          <div className="form-label-group">
            <input
              type="email" autoFocus
              className="form-control"
              id="email" required
              placeholder='Email address'
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
          <button type="submit" className="btn btn-custom">Sign in</button>
        </form>
      </div>
    )
  }
}

export default LoginForm