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
      <a href="/dashboard"><button className="btn btn-custom">Go to dashboard</button></a>
    ) : () => (
      <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <button style={{marginRight: '30px', width: 'auto'}} onClick={this.redirectToLogin} type="button" className="btn btn-custom">Log in</button>
        <a href="/signup"><button type="button" className="btn btn-custom">Sign up</button></a>
      </div>
    );
    return this.state.redirect
    ? (
      <Route
        render={(props) => <Redirect to={{pathname: '/login', state: {from: props.location.pathname}}} />}
      />
    ) : (
      <div id="home-page">
        <Navigation showNavLinks />
        <div className="Homepage text-center">
          <div>
            <h1 style={{color: '#333e48'}}>Online interaction made easier</h1>
            <p>Engage people through surveys and get their opinions easily</p>
            {<Content />}
          </div>
        </div>
      </div>
    )
  }
}

export default Homepage
