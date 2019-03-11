import React, { Component } from 'react'
import SingleQuestionView from './SingleQuestionView';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


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
    this.setState(() => ({
      loading: false,
      showingWelcomeMessage: true
    }))
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
    const id = Object.keys(sampleSurvey.questions).findIndex(_id => _id === responseState.question_id)
    const nextQuestion = responseState.nextQuestion.length > 0
      ? responseState.nextQuestion
      : Object.keys(sampleSurvey.questions)[id + 1] || ''
    
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
      currentQuestion: '',
      nextQuestion: Object.keys(sampleSurvey['questions'])[0] || ''
    }))
  }

  render() {
    if (this.state.loading) {
      return <div>loading.....</div>
    } else if (this.state.showingWelcomeMessage) {
      const data = {title: sampleSurvey['surveyName'], desc: sampleSurvey['surveyDescription']}
      return <div id="fill-survey"><WelcomeMessage data={data} next={this.handleStartQuestions} /></div>
    } else if (this.state.surveyComplete) {
      return <div>Done</div>
    }
    return (
      <div id="fill-survey">
        <SingleQuestionView
          prevQuestion={this.state.currentQuestion}
          currentQuestion={sampleSurvey['questions'][this.state.nextQuestion]}
          response={this.state.responses.find(res => res.question_id === this.state.nextQuestion) || {}}
          handleNextQuestionView={this.handleShowNextQuestion}
          handlePrevQuestionView={this.handleShowPrevQuestion}
        />
      </div>
    )
  }
}

export default FillSurvey


const sampleSurvey = {
  surveyCategory: "",
  surveyDescription: "This is a brief survey about the possible reuse of grey water",
  surveyName: "Grey Water Research",
  questions: {
    "100070c44305-a829-4376-94c3-a2eece38c529": {
      isLinked: false,
      options: [],
      optionsType: "text",
      question: "How many litres of water do you consume daily?",
      question_id: "100070c44305-a829-4376-94c3-a2eece38c529"
    },
    "1001a0ddbcff-1a01-4a9f-a25d-e06d4fa63d35": {
      isLinked: false,
      options: [
        {
          linkId: "",
          optionId: "3f8e0b6c-3492-43bf-b0c1-3c42a93219f3",
          optionText: "Very easy"
        },
        {
          linkId: "",
          optionId: "b54aed84-7a93-4654-b8fb-cdad2f0ffcc9",
          optionText: "Minimally easy"
        },
        {
          linkId: "",
          optionId: "293a1617-d721-44fd-b6ec-521df089d8f0",
          optionText: "Very uneasy"
        }
      ],
      optionsType: "multipleChoice",
      question: "How easy is it for you to get water?",
      question_id: "1001a0ddbcff-1a01-4a9f-a25d-e06d4fa63d35"
    },
    "10022e61b84b-55cb-45f8-a9d3-2cb176485059": {
      isLinked: false,
      options: [
        {
          linkId: "1003ad9da3fe-66a9-4402-9f74-2b0188e8d56a",
          optionId: "360ac502-f50a-4847-9411-53e193c9b456",
          optionText: "Yes"
        },
        {
          linkId: "1004ab327af7-f9f7-4a79-b5af-4b38199afc52",
          optionId: "c4509784-5bd6-4f06-a12c-890e20e07fca",
          optionText: "No"
        },
        {
          linkId: "1004ab327af7-f9f7-4a79-b5af-4b38199afc52",
          optionId: "68b414b7-e1ad-4a84-91b5-046daf74783e",
          optionText: "Maybe"
        }
      ],
      optionsType: "multipleChoice",
      question: "Do you know what grey water means?",
      question_id: "10022e61b84b-55cb-45f8-a9d3-2cb176485059"
    },
    "1003ad9da3fe-66a9-4402-9f74-2b0188e8d56a": {
      isLinked: false,
      options: [
        {
          linkId: "",
          optionId: "5435444a-76b4-4e9f-a418-fe96d08eaf6e",
          optionText: "Yes"
        },
        {
          linkId: "",
          optionId: "f626296d-7b0e-4a00-9aaa-6d15bcddd12c",
          optionText: "Neutral"
        },
        {
          linkId: "",
          optionId: "3a11a0f1-e454-499b-9032-128eaac2555c",
          optionText: "No"
        }
      ],
      optionsType: "multipleChoice",
      question: "Can you use water obtained from grey water?",
      question_id: "1003ad9da3fe-66a9-4402-9f74-2b0188e8d56a"
    },
    "1004ab327af7-f9f7-4a79-b5af-4b38199afc52": {
      isLinked: false,
      options: [
        {
          linkId: "",
          optionId: "3bd6d258-5f86-4c7d-af06-ad6e972687c7",
          optionText: "Yes"
        },
        {
          linkId: "",
          optionId: "30514c4a-2e9f-4a12-82e4-7d050d08bd38",
          optionText: "Neutral"
        },
        {
          linkId: "",
          optionId: "ac33eb04-0e66-4bee-a2dd-fe4b73e6d426",
          optionText: "No"
        }
      ],
      optionsType: "multipleChoice",
      question: "Grey water is liquid waste from cleaning. Can you use water obtained from grey water?",
      question_id: "1004ab327af7-f9f7-4a79-b5af-4b38199afc52"
    }
  }
}