import React, { Component } from 'react'

class ViewSurveys extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user
    }
  }
  
  render() {
    return (
      <div>
        View surveys
      </div>
    )
  }
}

export default ViewSurveys