import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SurveyOptionQuestionLinkPicker extends Component {

  constructor(props) {
    super(props)
    this.state = {
      options: [...this.props.currentOptions]
    }
  }

  static propTypes = {
    availableQuestions: PropTypes.array,
    currentOptions: PropTypes.array,
    handleSave: PropTypes.func
  }

  handleLinkedQuestionChange = (value, index) => {
    const nextState = [...this.state.options]
    nextState[index] = {
      ...this.state.options[index],
      'linkId': value
    }
    this.setState(() => ({
      options: nextState
    }))
  }

  render() {
    const questionsToChooseFrom = this.props.availableQuestions.map(question => (
      <option
        key={question.question_id}
        value={question.question_id}
      >
        {question.question}
      </option>
    ))
    const optionsToRender = this.state.options.map((option, index) => (
      <div className="option-link-picker__content-item" key={option.optionId}>
        <div className="option-link-picker__content-item__option">
          <span>{option.optionText}</span>
        </div>
        <div className="option-link-picker__content-item__question">
          <select
            value={this.state.options[index]['linkId']}
            onChange={({target: {value}}) => this.handleLinkedQuestionChange(value, index)}
            className="form-control"
            id="option-type-selector"
          >
            <option value="">{""}</option>
            {questionsToChooseFrom}
          </select>
        </div>
      </div>
    ))
    return (
      <div className="option-link-picker">
        <div className="option-link-picker__content">
          <h3>Link options to questions</h3>
          <button onClick={() => this.props.handleSave(this.state.options)} type="button" className="btn btn-info">Continue</button>
          {optionsToRender}
        </div>
      </div>
    )
  }
}

export default SurveyOptionQuestionLinkPicker

// TODO
// # Continue to fix the options and question in the render func
// # setup the state and handlers
// # setup the parent for saving
// - Add ft to check for the availablity of questions, then remove the id if it has probably been deleted