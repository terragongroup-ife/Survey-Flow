import React, { Component } from 'react'
import Loading from '../Loading'

class DashboardSurveyDetails extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    // do something
  }

  render() {
    if (this.state.error) {
      return <div>Error fetching the details for this survey</div>
    } else if (this.state.loading) {
      return <Loading message="Fetching the details of this survey" />
    }
    return (
      <div>
        Single Survey details
      </div>
    )
  }
}

export default DashboardSurveyDetails