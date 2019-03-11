import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SurveyMetaInfo extends Component {
  constructor(props) {
    super(props)

    this.surveyNameRef = React.createRef()

    this.surveyCategory = [
      {
        name: 'Customer satisfaction',
        value: 'customerSatisfaction'
      },
      {
        name: 'Feedback',
        value: 'feedback'
      },
      {
        name: 'Research',
        value: 'research'
      },
      {
        name: 'Quiz',
        value: 'quiz'
      },
      {
        name: 'Evaluation',
        value: 'evaluation'
      },
      {
        name: 'Registration Form',
        value: 'registrationForm'
      },
      {
        name: 'Application Form',
        value: 'applicationForm'
      },
      {
        name: 'Polls',
        value: 'polls'
      },
      {
        name: 'Demographics',
        value: 'demographics'
      },
      {
        name: 'Educational',
        value: 'educational'
      },
      {
        name: 'Industry Specific',
        value: 'industrySpecific'
      },
      {
        name: 'For fun',
        value: 'forFun'
      },
      {
        name: 'Invitation',
        value: 'invitation'
      },
      {
        name: 'Political',
        value: 'political'
      },
      {
        name: 'Others',
        value: 'others'
      }
    ]

    this.state = {
      surveyName: this.props.surveyName,
      surveyDescription: this.props.surveyDescription,
      surveyCategory: this.props.surveyCategory
    }

    this.initialState = {...this.state}
  }

  static propTypes = {
    nameSavedBefore: PropTypes.bool,
    handleFormSubmit: PropTypes.func.isRequired,
    surveyName: PropTypes.string,
    surveyDescription: PropTypes.string
  }

  handleCancel = () => {
    this.setState(() => ({
      ...this.initialState
    }), () => this.props.handleFormSubmit(this.state))
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    this.props.handleFormSubmit(this.state)
  }

  handleSurveyNameChange = (e) => {
    e.persist()
    this.setState(() => ({
      surveyName: e.target.value
    }))
  }

  handleSurveyDescriptionChange = (e) => {
    e.persist()
    this.setState(() => ({
      surveyDescription: e.target.value
    }))
  }

  handleSurveyCategoryChange = (e) => {
    e.persist()
    this.setState(() => ({
      surveyCategory: e.target.value
    }))
  }

  componentDidMount() {
    this.surveyNameRef.current.focus()
  }

  render() {
    const OptionTypes = this.surveyCategory.map(category => (
      <option key={category.value} value={category.value}>{category.name}</option>
    ))

    return (
      <div className="survey-meta-modal">
        <div className="survey-meta-modal__form">
          <h4 className="text-center">Tell the respondents about your survey</h4>
          <form onSubmit={this.handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="survey-name">Survey Name</label>
              <textarea
                name="survey-name"
                id="survey-name"
                className="form-control"
                rows="1"
                value={this.state.surveyName}
                onChange={this.handleSurveyNameChange}
                ref={this.surveyNameRef}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="FormControlSelect1">Survey Category</label>
              <select
                value={this.state.surveyCategory}
                onChange={this.handleSurveyCategoryChange}
                className="form-control"
                id="FormControlSelect1"
              >
                {OptionTypes}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="survey-desc">Brief Description</label>
              <textarea
                name="survey-desc"
                id="survey-desc"
                className="form-control"
                rows="3"
                value={this.state.surveyDescription}
                onChange={this.handleSurveyDescriptionChange}
                required
              />
            </div>
            <div className="float-right">
              {this.props.nameSavedBefore && <button type="button" className="btn btn-cancel mr-2" onClick={this.handleCancel}>Cancel</button>}
              <button type="submit" className="btn btn-info">Continue</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default SurveyMetaInfo