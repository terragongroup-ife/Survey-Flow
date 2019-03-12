import React, { Component } from 'react'
import uuid from 'uuid'
import { faUserCircle, faEdit, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from 'react-router-dom'
import { cloneDeep } from 'lodash'
import SurveyMetaInfo from './SurveyMetaInfoModal'
import SurveyQuestion from './SurveyQuestion'

const SurveySaved = (props) => (
  <div id="survey">
    <div>
      <p>Survey published successfully!</p>
      <a href="/dashboard"><button type="button" className="btn btn-custom">Go to dashboard</button></a>
    </div>
  </div>
)

class CreateSurvey extends Component {

  constructor(props) {
    super(props)
    this.questionsIdIndex = 1000
    const randomUuid = this.questionsIdIndex++ + uuid.v4()
    this.tabIndex = 0
    this.surveyNameSavedBefore = false
    this.state = {
      user: this.props.user,
      surveyName: 'New Survey',
      surveyDescription: 'A new survey',
      surveyCategory: '',
      showMetaInfoModal: true,
      questions: {
        [randomUuid]: {
          isLinked: false,
          question_id: randomUuid,
          question: '',
          optionsType: 'multipleChoice',
          options: []
        }
      }
    }
  }

  handleFormEdit = () => {
    this.setState(() => ({
      showMetaInfoModal: true
    }))
  }

  handleSurveyMetaFormSubmit = ({surveyName, surveyDescription}) => {
    this.setState(() => ({
      surveyName,
      surveyDescription,
      showMetaInfoModal: false
    }))
  }
  
  handleAddQuestion = () => {
    const id = this.questionsIdIndex++ + uuid.v4()
    const newQuestionObject = {
      isLinked: false,
      question_id: id,
      question: '',
      optionsType: 'multipleChoice',
      options: []
    }
    this.setState(() => ({
      questions: {
        ...this.state.questions,
        [id]: newQuestionObject
      }
    }))
  }

  handleQuestionDelete = (question_id) => {
    // dsf
    let nextState = cloneDeep(this.state.questions)
    delete nextState[question_id]
    if (Object.keys(nextState).length !== 0) {
      this.setState(() => ({
        questions: nextState
      }))
    }
  }

  handleOptionTypeChange = (question_id, newOptionType) => {
    if (newOptionType !== this.state.questions[question_id]['optionsType']) {
      this.setState(() => ({
        questions: {
          ...this.state.questions,
          [question_id]: {
            ...this.state.questions[question_id],
            'optionsType': newOptionType,
            'options': []
          }
        }
      }))
    }
  }

  handleQuestionFieldBlur = (question_id, updatedQuestion) => {
    if (updatedQuestion !== this.state.questions[question_id]['question']) {
      this.setState(() => ({
        questions: {
          ...this.state.questions,
          [question_id]: {
            ...this.state.questions[question_id],
            'question': updatedQuestion
          }
        }
      }))
    }
  }

  handleOptionsEditBlur = (question_id, updatedOption) => {
    if (updatedOption !== this.state.questions[question_id]['option']) {
      this.setState(() => ({
        questions: {
          ...this.state.questions,
          [question_id]: {
            ...this.state.questions[question_id],
            'options': updatedOption
          }
        }
      }))
    }
  }

  handleAddButtonClick = () => {
    // Meant for adding stuffs like sections, paragraph text, questions
    // by displaying a popup onbuttonclick
    // Used for adding questions only ATM
    this.handleAddQuestion()
  }

  publishSurvey = () => {
    // Check if there are questions
    // If no, don't publish
    // If yes, fetch data from the state then send to the backend
    let surveyData = {}
    surveyData['userId'] = this.state.user.userId
    surveyData['surveyName'] = this.state.surveyName
    surveyData['surveyCategory'] = this.state.surveyCategory
    surveyData['surveyDescription'] = this.state.surveyDescription
    surveyData['surveyQuestions'] = this.state.questions

    // Now, post the survey to the backend
    fetch('https://young-anchorage-24773.herokuapp.com/post-survey', {
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      method: "POST",
      body: JSON.stringify(surveyData)
    })
      .then(res => res.json())
      .then(res => {
        if (res.code === 201) {
          // Survey saved
          console.log('Survey saved successfully')
          this.setState(() => ({
            surveySaved: true
          }))
        } else {
          console.log('Survey not saved')
          this.setState(() => ({
            surveySaved: false
          }))
        }
      })
      .catch(err => {
        console.log('Error:', err)
        this.setState(() => ({
          surveySaved: false
        }))
      })
  }

  componentDidMount() {
    this.surveyNameSavedBefore = true
  }

  render() {
        // ref={index === questionKeys.length-1 ? this.lastElemRef : ''}
    let questionsCount = 1
    const questionKeys = Object.keys(this.state.questions)
    const questionsToRender = questionKeys.map((questionKey, index) => {
      const nextQuestionsIndices = questionKeys.slice(index+1)
      const nextQuestions = nextQuestionsIndices.map(questionKey => {
        return {...this.state.questions[questionKey]}
      })
      return (
        <SurveyQuestion
          key={questionKey}
          tabIndex={this.tabIndex++}
          question={{...this.state.questions[questionKey], question_no: questionsCount++}}
          handleQuestionDelete={this.handleQuestionDelete}
          handleQuestionFieldBlur={this.handleQuestionFieldBlur}
          handleOptionTypeChange={this.handleOptionTypeChange}
          handleOptionsEditBlur={this.handleOptionsEditBlur}
          nextQuestions={nextQuestions}
        />
      )
    })

    return this.state.surveySaved
    ? <SurveySaved />
    : (
      <div id="survey">
        <div className="survey-navigation">
          <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top justify-content-between">
            <div style={{display: 'flex'}}>
              <Link to="/dashboard">
                <button type="button" id="back-to-dashboard" className="btn btn-info" title="Go back to Dashboard">
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
              </Link>
              <a href="/#" className="navbar-brand">SurveyFlow</a>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse" id="navbarsExample04" style={{flexGrow: 0}}>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/#">Save as Draft</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/#">Get Link</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/#">Preview</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="example.com" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><FontAwesomeIcon size="lg" icon={faUserCircle} /></a>
                  <div className="dropdown-menu" aria-labelledby="dropdown04">
                    <a className="dropdown-item" href="/#">Help</a>
                    <a className="dropdown-item" href="/#">Go Pro!</a>
                    <a className="dropdown-item" href="/#">Profile</a>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="survey-body">
          <div>
            <section className="meta-section">
              <h3 title="Survey Title" className="meta-section__name">{this.state.surveyName}</h3>
              <h5 title="Survey Description" className="meta-section__desc">{this.state.surveyDescription}</h5>
              <span className="meta-section__edit-btn" onClick={this.handleFormEdit}>
                <FontAwesomeIcon title="Edit Survey Title" size="2x" icon={faEdit}/>
              </span>
            </section>
            {questionsToRender}
          </div>
        </div>
        <div className="survey-actions">
          <Link to="/dashboard">
            <button type="button" className="btn btn-cancel mr-2">Cancel</button>
          </Link>
          <button onClick={this.publishSurvey} type="button" className="btn btn-info">Publish Survey</button>
        </div>
        {this.state.showMetaInfoModal && <SurveyMetaInfo
          nameSavedBefore={this.surveyNameSavedBefore}
          handleFormSubmit={this.handleSurveyMetaFormSubmit}
          surveyName={this.state.surveyName}
          surveyDescription={this.state.surveyDescription}
          surveyCategory={this.state.surveyCategory}
        />}
        <div className="floating-button" onClick={this.handleAddButtonClick} title="Add a question">
          <div>+</div>
        </div>
      </div>
    )
  }
}

export default CreateSurvey

// TODO
// - Initialize this state from the api call data instead of empty data
// - In that case, an additional props field (isEditMode) will be passed to indicate 
//   that we are editing an already created survey
// - Appropriately pass the necessary props to all children to indicate that we are editing