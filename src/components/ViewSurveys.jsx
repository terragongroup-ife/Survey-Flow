import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ViewSurveysWrapper extends Component {
  render() {
    return <ViewSurveys {...this.props} />
  }
}

class ViewSurveys extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user
    }
  }

  static propTypes = {
    surveyData: PropTypes.string
  }

  componentDidMount() {
    // Do sth
  }
  
  render() {
    return (
      <div>
        View surveys
      </div>
    )
  }
}

export default ViewSurveysWrapper