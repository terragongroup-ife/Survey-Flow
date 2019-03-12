import React, { Component } from 'react'
import $ from 'jquery'
import {Link} from 'react-router-dom'
import Navigation from './Navigation'
import SidebarNavigation from './SidebarNavigation'

class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user
    }
  }

  componentDidMount() {
    $('#sidebarCollapse').on('click', function () {
      $('#content').toggleClass('active')
      $('#sidebar').toggleClass('active')
    });
  }

  render() {
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
                <div className="text-underline">My Surveys</div>
                <div className="row justify-content-center">
                  <div className="survey-item">
                    <div className="survey-item__thumbnail"></div>
                    <div className="survey-item__meta">
                      <div className="survey-item__meta-title">Job Application</div>
                      <div className="survey-item__meta-response">5 responses</div>
                      <div className="survey-item__meta-options"></div>
                    </div>
                  </div>
                  <div className="survey-item">
                    <div className="survey-item__thumbnail"></div>
                    <div className="survey-item__meta">
                      <div className="survey-item__meta-title">Invitation</div>
                      <div className="survey-item__meta-response">No response</div>
                      <div className="survey-item__meta-options"></div>
                    </div>
                  </div>
                  <div className="survey-item">
                    <div className="survey-item__thumbnail"></div>
                    <div className="survey-item__meta">
                      <div className="survey-item__meta-title">Research</div>
                      <div className="survey-item__meta-response">5 responses</div>
                      <div className="survey-item__meta-options"></div>
                    </div>
                  </div>
                  <div className="survey-item">
                    <div className="survey-item__thumbnail"></div>
                    <div className="survey-item__meta">
                      <div className="survey-item__meta-title">Feedback</div>
                      <div className="survey-item__meta-response">2 responses</div>
                      <div className="survey-item__meta-options"></div>
                    </div>
                  </div>
                  <div className="survey-item">
                    <div className="survey-item__thumbnail"></div>
                    <div className="survey-item__meta">
                      <div className="survey-item__meta-title">Report</div>
                      <div className="survey-item__meta-response">15 responses</div>
                      <div className="survey-item__meta-options"></div>
                    </div>
                  </div>
                  <div className="survey-item">
                    <div className="survey-item__thumbnail"></div>
                    <div className="survey-item__meta">
                      <div className="survey-item__meta-title">Job Application</div>
                      <div className="survey-item__meta-response">5 responses</div>
                      <div className="survey-item__meta-options"></div>
                    </div>
                  </div>
                  <div className="survey-item">
                    <div className="survey-item__thumbnail"></div>
                    <div className="survey-item__meta">
                      <div className="survey-item__meta-title">Job Application</div>
                      <div className="survey-item__meta-response">5 responses</div>
                      <div className="survey-item__meta-options"></div>
                    </div>
                  </div>
                  <div className="survey-item">
                    <div className="survey-item__thumbnail"></div>
                    <div className="survey-item__meta">
                      <div className="survey-item__meta-title">Job Application</div>
                      <div className="survey-item__meta-response">5 responses</div>
                      <div className="survey-item__meta-options"></div>
                    </div>
                  </div>
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