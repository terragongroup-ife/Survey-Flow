import React, { Component } from 'react'
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
    const token = localStorage.getItem('token')
    if (token) {
      fetch('/auth', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({"user": {email: token.email, authToken: token.authToken}})
      })
        .then(res => res.json())
        .then(res => {
          console.log('User authenticated:', res)
          this.setState(() => ({
            isLoggedIn: !!token,
            user: res
          }))
        })
        .catch(err => {
          console.log('Error due to:', err)
        })
    } else {
      this.setState(() => ({
        isLoggedIn: !!token
      }))
    }
  }

  componentDidMount() {
    this.isUserLoggedIn()
  }

  render() {
    return (
      <div className="Homepage">
        <Navigation showNavLinks={true} />
      </div>
    )
  }
}

export default Homepage
