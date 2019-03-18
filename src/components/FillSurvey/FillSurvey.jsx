import React, { Component } from 'react'
import SingleQuestionView from './SingleQuestionView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Custom404Page from '../Custom404Page';
import Loading from '../Loading';
import SurveyComplete from './SurveyComplete';


const WelcomeMessage = (props) => {
  return (
    <div className="welcome-message text-center">
      <div>
        <p>{props.data.title}</p>
        <p>Thanks for taking the time to fill this survey.</p>
        <p>{props.data.desc}</p>
      </div>
      <button onClick={props.next} className="btn btn-response">Start survey <FontAwesomeIcon icon={faArrowRight} /></button>
    </div>
  )
}


const FillSurveyWrapper = ({match: {params : {surveyId}}}) => {
  const surveyIdPassed = !!surveyId
  if (surveyIdPassed) {
    return <FillSurvey surveyId={surveyId}/>
  } else {
    return <Custom404Page message="This survey either doesn't exist or has been moved. Search for surveys on our home page instead" />
  }
}


class FillSurvey extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showingWelcomeMessage: false,
      loading: true,
      responses: []
    }
  }

  componentDidMount() {
    // Fetch the survey questions from the backend using the survey id
    // Then set loading to false, and showingWelcomeMessage to true
    const surveyId = this.props.surveyId
    fetch(`https://young-anchorage-24773.herokuapp.com/survey/${surveyId}`)
      .then(res => res.json())
      .then(res => {
        if (res.code === 201) {
          this.setState(() => ({
            loading: false,
            surveyData: res.result,
            showingWelcomeMessage: true
          }))
        } else {
          this.setState(() => ({
            loading: false,
            error: true
          }))
        }
      })
      .catch(err => {
        console.log('Error:', err)
        this.setState(() => ({
          loading: false,
          error: true
        }))
      })
  }

  handleShowNextQuestion = (responseState) => {
    // Get the responses index for the current question_id,
    // if not found, simply push the new responses state object to the end of the responses state
    // If found, update the data at that index
    const index = this.state.responses.findIndex(response => response.question_id === responseState.question_id)
    let nextState
    if (index < 0) {
      nextState = [
        ...this.state.responses,
        {
          question_id: responseState.question_id,
          response: responseState.response,
          response_id: responseState.response_id
        }
      ]
    } else {
      nextState = [...this.state.responses]
      nextState[index] = {
        ...this.state.responses[index],
        question_id: responseState.question_id,
        response: responseState.response,
        response_id: responseState.response_id
      }
    }

    // Get the id of the next question id from the responseState, or from the questions
    // If there are no more questions, set the next question id to ''
    const id = Object.keys(this.state.surveyData['surveyQuestions']).findIndex(_id => _id === responseState.question_id)
    const nextQuestion = responseState.nextQuestion.length > 0
      ? responseState.nextQuestion
      : Object.keys(this.state.surveyData['surveyQuestions'])[id + 1] || ''
    
    // If next question is '', then survey is complete
    // Else, set the next question id
    if (nextQuestion.length < 1) {
      this.setState(() => ({
        surveyComplete: true,
        currentQuestion: responseState.question_id,
        responses: [...nextState]
      }))
    } else {
      this.setState(() => ({
        nextQuestion: nextQuestion,
        currentQuestion: responseState.question_id,
        responses: [...nextState]
      }))
    }
  }

  handleShowPrevQuestion = (prevQuestion) => {
    // Set the nextquestion to be the prev question
    if (prevQuestion.length < 1) {
      this.setState(() => ({
        loading: false,
        showingWelcomeMessage: true
      }))
    } else {
      const id = this.state.responses.findIndex(resp => resp.question_id === prevQuestion)
      const prevPrevQuestion = this.state.responses[id - 1] ? (this.state.responses[id - 1]['question_id'] || '') : ''
      this.setState(() => ({
        nextQuestion: prevQuestion,
        currentQuestion: prevPrevQuestion
      }))
    }
  }

  handleStartQuestions = () => {
    this.setState(() => ({
      showingWelcomeMessage: false,
      loading: false,
      error: false,
      currentQuestion: '',
      nextQuestion: Object.keys(this.state.surveyData['surveyQuestions'])[0] || ''
    }))
  }

  render() {
    if (this.state.error) {
      return <Custom404Page message="This survey either doesn't exist or has been moved. Search for surveys on our home page instead" />
    } else if (this.state.loading) {
      return <Loading message="Loading the survey for you" />
    } else if (this.state.showingWelcomeMessage) {
      const data = {title: this.state.surveyData['surveyName'], desc: this.state.surveyData['surveyDescription']}
      return <div id="fill-survey"><WelcomeMessage data={data} next={this.handleStartQuestions} /></div>
    } else if (this.state.surveyComplete) {
      return <div id="fill-survey"><SurveyComplete surveyId={this.props.surveyId} data={this.state.responses} /></div>
    }
    return (
      <div id="fill-survey">
        <SingleQuestionView
          prevQuestion={this.state.currentQuestion}
          currentQuestion={this.state.surveyData['surveyQuestions'][this.state.nextQuestion]}
          response={this.state.responses.find(res => res.question_id === this.state.nextQuestion) || {}}
          handleNextQuestionView={this.handleShowNextQuestion}
          handlePrevQuestionView={this.handleShowPrevQuestion}
        />
      </div>
    )
  }
}

export default FillSurveyWrapper