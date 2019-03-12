import React, { Component } from 'react'
import {Route, Switch} from 'react-router-dom'
import {PrivateRoute, PublicRoute} from '../helpers/SpecialRoutes'
import Homepage from './Homepage'
// import GoogleLoginPage from './GoogleLoginPage'
import LoginPage from './LoginPage'
import SignupPage from './SignupPage'
import CreateSurvey from './CreateSurvey'
import Dashboard from './Dashboard'
import FillSurvey from './FillSurvey'
import ViewSurveys from './ViewSurveys'

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
            exact path="/dashboard"
            component={Dashboard}
          />
          <PrivateRoute
            exact path="/create"
            component={CreateSurvey}
          />
          <PrivateRoute
            path="/mysurveys"
            component={ViewSurveys}
          />
          <PublicRoute
            path="/survey"
            component={FillSurvey}
          />
          <Route exact path="/" component={Homepage}/>
        </Switch>
      </>
    )
  }
}

export default AncestorComponent