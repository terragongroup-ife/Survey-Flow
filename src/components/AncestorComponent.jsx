import React, { Component } from 'react'
import {Route, Switch} from 'react-router-dom'
import {PrivateRoute, PublicRoute} from '../helpers/SpecialRoutes'
import Homepage from './Homepage'
// import GoogleLoginPage from './GoogleLoginPage'
import LoginPage from './Login/LoginPage'
import SignupPage from './Signup/SignupPage'
import CreateSurvey from './CreateSurvey/CreateSurvey'
import Dashboard from './Dashboard/Dashboard'
import FillSurvey from './FillSurvey/FillSurvey'
import ViewSurveys from './ViewSurveys'
import Custom404Page from './Custom404Page'

class AncestorComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <>
        <Switch>
          <PublicRoute
            exact path="/login"
            component={LoginPage}
          />
          <PublicRoute
            exact path="/signup"
            component={SignupPage}
          />
          <PrivateRoute
            path="/dashboard"
            component={Dashboard}
          />
          <PrivateRoute
            exact path="/create"
            component={CreateSurvey}
          />
          <PrivateRoute
            path="/mysurveys/:surveyId"
            component={ViewSurveys}
          />
          <Route
            path="/survey/:surveyId"
            component={FillSurvey}
          />
          <Route exact path="/" component={Homepage}/>
          <Route component={Custom404Page}/>
        </Switch>
      </>
    )
  }
}

export default AncestorComponent