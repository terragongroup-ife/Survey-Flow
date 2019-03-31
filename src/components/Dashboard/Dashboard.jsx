import React, { Component } from 'react'
import $ from 'jquery'
import {Link} from 'react-router-dom'
import Navigation from '../Navigation'
import SidebarNavigation from './SidebarNavigation'
import Loading from '../Loading'
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.surveyCategory = {
      'customerSatisfaction': 'Customer satisfaction',
      'feedback': 'Feedback',
      'research': 'Research',
      'quiz': 'Quiz',
      'evaluation': 'Evaluation',
      'registrationForm': 'Registration Form',
      'applicationForm': 'Application Form',
      'polls': 'Polls',
      'demographics': 'Demographics',
      'educational': 'Educational',
      'industrySpecific': 'Industry Specific',
      'forFun': 'For fun',
      'invitation': 'Invitation',
      'political': 'Political',
      'others': 'Others',
      'all': 'All'
    }
    this.state = {
      user: this.props.user,
      loading: true,
      modalShown: false,
      currentCategory: "all"
    }
  }

  handleSwitchCategories = (category) => {
    this.setState(() => ({
      currentCategory: category
    }))
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
          }), () => this.check)
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

    // Filter the surveys to render based on category
    let SurveysToShow = [], categories = new Set()
    this.state.surveys.forEach(survey => {
      if ((this.state.currentCategory === 'all') || (this.state.currentCategory === survey.surveyCategory)) {
        SurveysToShow.push((
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
      }
      categories.add(survey.surveyCategory)
    })
    categories = Array.from(categories)

    return (
      <div className="dashboard">
        <SidebarNavigation
          currentCategory={this.state.currentCategory}
          categories={categories}
          switchCategories={this.handleSwitchCategories}
        />
        <div id="content">
          <div>
            <Navigation
              showNavLinks={false}
              showSidebarToggleButton={true}
            />
            <div className="dashboard-content text-large">
              <div className="container content-container">
                <div className="text-underline">{this.surveyCategory[this.state.currentCategory]} Surveys</div>
                <div className="row justify-content-center">
                  {SurveysToShow}
                  {!this.state.surveys.length && <p style={{marginTop: '30vh', lineHeight: '170%', textAlign: 'center'}}>No surveys here yet.<br /> Click on the + button to create one now.</p>}
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