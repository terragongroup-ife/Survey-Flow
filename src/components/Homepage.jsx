import React, { Component } from 'react'
import {Route, Redirect} from 'react-router-dom'
import {checkAuth} from '../helpers/SpecialRoutes'
import Navigation from './Navigation'

class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      isLoggedIn: false
    }
  }

  isUserLoggedIn = () => {
    const {isLoggedIn, data} = checkAuth()
    this.setState(() => ({
      isLoggedIn,
      user: data
    }))
  }

  redirectToLogin = () => {
    this.setState(() => ({
      redirect: true
    }))
  }

  componentDidMount() {
    this.isUserLoggedIn()
  }

  render() {
    const Content = this.state.user
    ? () => (
      <div className="container">
        <p>Survey Flow</p>
        <a href="/dashboard"><button className="btn btn-custom">Go to dashboard</button></a>
      </div>
    ) : () => (
      <div className="container">
        <p>Survey Flow</p>
        <button
          type="button"
          onClick={this.redirectToLogin}
          className="btn btn-custom"
        >
          Log in to your account
        </button>
      </div>
    );
    return this.state.redirect
    ? (
      <Route
        render={(props) => <Redirect to={{pathname: '/login', state: {from: props.location.pathname}}} />}
      />
    ) : (
      <div className="Homepage">
        <Navigation showNavLinks={true} />
        <div>
          {<Content />}
          <p>Content to be filled here soon</p>
        </div>
      </div>
    )
  }
}

export default Homepage
