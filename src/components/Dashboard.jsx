import React, { Component } from 'react'
import $ from 'jquery'
import {Link} from 'react-router-dom'
import Navigation from './Navigation'
import SidebarNavigation from './SidebarNavigation'
import Loading from './Loading'
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
      loading: true
    }
  }

  toggleSidebar = () => {
    $('#sidebarCollapse').on('click', function () {
      $('#content').toggleClass('active')
      $('#sidebar').toggleClass('active')
    });
  }

  componentDidUpdate() {
    if (this.state.surveys) {
      this.toggleSidebar()
    }
  }

  componentDidMount() {
    const userId = this.state.user.userID
    // Fetch the user's surveys
    fetch(`https://young-anchorage-24773.herokuapp.com/surveys/${userId}`)
      .then(res => res.json())
      .then(res => {
        if (res.code === 201) {
          // Surveys fetched
          this.setState(() => ({
            surveys: res.result,
            error: false,
            loading: false
          }))
        } else {
          this.setState(() => ({
            error: true,
            loading: false
          }))
        }
      })
      .catch(err => {
        this.setState(() => ({
          error: true,
          loading: false
        }))
      })
  }

  render() {
    if (this.state.error) {
      return <div>Error fetching your surveys</div>
    } else if (this.state.loading) {
      return <Loading message="Fetching all your surveys" />
    }
    const SurveysToShow = this.state.surveys.map(survey => (
      <div key={survey._id} className="survey-item">
        <div className="survey-item__thumbnail"></div>
        <div className="survey-item__meta">
          <div className="survey-item__meta-title">{survey.surveyName}</div>
          <div className="survey-item__meta-response">{Object.keys(survey.surveyQuestions).length} questions</div>
          <div className="survey-item__meta-options">
            <a href={`/survey/${survey._id}`} rel="noopener noreferrer" target='_blank'><FontAwesomeIcon icon={faExternalLinkAlt} /></a>
          </div>
        </div>
      </div>
    ))
    return (
      <div className="dashboard">
        <SidebarNavigation />
        <div id="content">
          <div>
            <Navigation
              showNavLinks={false}
              showSidebarToggleButton={true}
            />
            <div className="dashboard-content text-large">
              <div className="container content-container">
                <div className="text-underline">Your Surveys</div>
                <div className="row justify-content-center">
                  {SurveysToShow}
                  {!this.state.surveys && <><p>No surveys here yet.</p><p>Click on the + button to create one now.</p></>}
                </div>
              </div>
            </div>
          </div>
          <Link to="/create">
            <div className="floating-button" title="Create New Survey">
              <div>+</div>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default Dashboard