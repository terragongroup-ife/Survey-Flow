import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isEqual } from 'lodash'
import ContentEditable from 'react-contenteditable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

class SingleQuestionView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      nextQuestion: '',
      response: this.props.response.response || (this.props.currentQuestion['optionsType'] === 'checkbox' ? [] : ''),
      response_id: this.props.response.response_id || (this.props.currentQuestion['optionsType'] === 'checkbox' ? [] : '')
    }
  }

  static propTypes = {
    response: PropTypes.object,
    prevQuestion: PropTypes.string,
    currentQuestion: PropTypes.object,
    handleNextQuestionView: PropTypes.func,
    handlePrevQuestionView: PropTypes.func
  }

  handleNextClick = () => {
    let responseState
    const question = this.props.currentQuestion
    if (question['optionsType'] === 'multipleChoice') {
      responseState = {
        ...this.state,
        nextQuestion: question['options'].find(option => option.optionId === this.state.response_id)['linkId'],
        response: question['options'].find(option => option.optionId === this.state.response_id)['optionText'],
        question_id: question['question_id'],
      }
    } else {
      responseState = {
        ...this.state,
        question_id: this.props.currentQuestion['question_id'],
      }
    }
    this.props.handleNextQuestionView(responseState)
  }

  handlePrevClick = () => {
    this.props.handlePrevQuestionView(this.props.prevQuestion)
  }

  handleCheckboxChange = (value, index, checked) => {
    const responseState = [...this.state.response]
    const responseIdState = [...this.state.response_id]

    // Add the value to state if the checkbox is checked
    if (checked) {
      const response = this.props.currentQuestion['options'].find(option => option.optionId === value)['optionText']
      responseState[index] = response
      responseIdState[index] = value
    }
    // Else if it is unchecked, remove the value
    else {
      delete responseState[index]
      delete responseIdState[index]
    }
    
    this.setState(() => ({
      response: responseState,
      response_id: responseIdState
    }))
  }

  handleMutipleChoiceChange = e => {
    e.persist()
    this.setState({
      response_id: e.target.value
    })
  }

  handleTextChange = (value) => {
    this.setState({
      response: value,
      response_id: ''
    })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (!isEqual(this.props, prevProps)) {
      this.setState(() => ({
        response: this.props.response['response'] || (this.props.currentQuestion['optionsType'] === 'checkbox' ? [] : ''),
        response_id: this.props.response['response_id'] || (this.props.currentQuestion['optionsType'] === 'checkbox' ? [] : '')
      }))
    }
  }

  render() {
    let OptionsToRender, optionsType = this.props.currentQuestion['optionsType']
    if (optionsType === 'text') {
      OptionsToRender = [(
        <div key="text">
          <ContentEditable
            html={this.state.response}
            disabled={false}
            onChange={({target: {value}}) => this.handleTextChange(value)}
            className='question-response-text question-input'
            data-ph="Type your response here..."
            tagName='div'
          />
        </div>
      )]
    } else if (optionsType === 'multipleChoice') {
      OptionsToRender = this.props.currentQuestion['options'].map(option => (
        <div className="form-check" key={option['optionId']}>
          <label>
            <input
              type="radio"
              name="radiobtns"
              value={option['optionId']}
              onChange={this.handleMutipleChoiceChange}
              checked={this.state.response_id === option['optionId']}
              className="form-check-input"
            />
            {option['optionText']}
          </label>
        </div>
      ))
    } else if (optionsType === 'checkbox') {
      OptionsToRender = this.props.currentQuestion['options'].map((option, index) => (
        <div className="form-check" key={option['optionId']}>
          <label>
            <input
              type="checkbox"
              name="checks"
              value={option['optionId']}
              onChange={({target: {value, checked}}) => this.handleCheckboxChange(value, index, checked)}
              checked={!!this.state.response_id[index]}
              className="form-check-input"
            />
            {option['optionText']}
          </label>
        </div>
      ))
    }
    return (
      <div>
        <div className="question-view">
          <div className="question-view__question">{this.props.currentQuestion['question']}</div>
          <div className="question-view__response">
            {optionsType === 'text' ? OptionsToRender : <form>{OptionsToRender}</form>}
          </div>
        </div>
        <div className="action-buttons">
          <button className="btn btn-response" onClick={this.handlePrevClick}><FontAwesomeIcon icon={faArrowLeft} /> Prev</button>
          <button disabled={!(this.state.response || this.state.response_id)} className="btn btn-response" onClick={this.handleNextClick}>Next <FontAwesomeIcon icon={faArrowRight} /></button>
        </div>
      </div>
    )
  }
}

export default SingleQuestionView