import React, { PureComponent } from 'react'
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ContentEditable from 'react-contenteditable'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import {isEqual} from 'lodash'

class SurveyQuestionOptions extends PureComponent {

  constructor(props) {
    super(props)
    const defaultText = this.props.config['optionConfig']['defaultText']
    let array = []
    // Initialize this state from api call data instead of default text
    for (let i = 0; i < this.props.config['optionConfig']['defaultNo']; i++) {
      array.push({
        optionId: uuid.v4(),
        optionText: this.props.config['optionConfig']['editable'] ? '' : (defaultText[i] || defaultText[0]),
        linkId: ''
      })
    }
    if (this.props.currentData.length < 1) {
      // No previous options have been saved
      this.state = {
        optionData: Object.assign([], array)
      }
    } else {
      // Initialize state from previously saved options
      this.state = {
        optionData: [...this.props.currentData]
      }
    }
  }

  static propTypes = {
    handleOptionsEditBlur: PropTypes.func,
    config: PropTypes.object,
    currentData: PropTypes.array
  }

  handleOptionsEditChange = ({target: {value}}, index) => {
    const currentState = [...this.state.optionData]
    currentState[index] = {
      ...this.state.optionData[index],
      optionText: value
    }
    this.setState(() => ({
      optionData: currentState
    }))
  }

  handleOptionsEditBlur = () => {
    this.props.handleOptionsEditBlur(this.state.optionData)
  }

  handleOptionAdd = (index) => {
    index++
    // Add new option just after the index
    const newOption = {
      optionId: uuid.v4(),
      optionText: '',
      linkId: ''
    }
    const nextState = [
      ...this.state.optionData.slice(0, index),
      newOption,
      ...this.state.optionData.slice(index)
    ]
    this.setState(() => ({
      optionData: nextState
    }), this.handleOptionsEditBlur)
  }

  handleOptionDelete = (index) => {
    // Remove the option at the index
    let currentState = [...this.state.optionData]
    const newState = currentState.filter((val, ind) => ind !== index)
    if (newState.length !== 0) {
      this.setState(() => ({
        optionData: newState
      }), this.handleOptionsEditBlur)
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.config['optionType'] !== prevProps.config['optionType']) {
      if (this.props.currentData.length < 1) {
        // No previous options have been saved
        const defaultText = this.props.config['optionConfig']['defaultText']
        let array = []
        for (let i = 0; i < this.props.config['optionConfig']['defaultNo']; i++) {
          array.push({
            optionId: uuid.v4(),
            optionText: this.props.config['optionConfig']['editable'] ? '' : (defaultText[i] || defaultText[0]),
            linkId: ''
          })
        }
        this.setState(() => ({
          optionData: Object.assign([], array)
        }))
      } else {
        // Update state from api call data of previously saved options instead of default text
        this.setState(() => ({
          optionData: [...this.props.currentData]
        }))
      }
    } else if (!isEqual(this.props.currentData, prevProps.currentData)) {
      this.setState(() => ({
        optionData: [...this.props.currentData]
      }))
    }
  }

  render() {
    let OptionsToRender
    const elemName = this.props.config['optionType']
    
    // If the option elem type is a contenteditable
    if (this.props.config['optionConfig']['elemType'] === 'ce') {
      OptionsToRender = this.state.optionData.map((data, index) => (
        <li key={index+elemName} className="list-item">
          <ContentEditable
            html={this.props.config['optionType'] === 'text' ? '' : this.state.optionData[index]['optionText']}
            disabled={!this.props.config['optionConfig']['editable']}
            onChange={(e) => this.handleOptionsEditChange(e, index)}
            className='question-option-text'
            data-ph="Text answer will be filled in here..."
            tagName='div'
          />
        </li>
      ))
    }
    // Else if the option elem type is a checkbox
    else if (this.props.config['optionConfig']['elemType'] === 'cb') {
      OptionsToRender = this.state.optionData.map((data, index) => (
        <li key={index+elemName} className="list-item question-option-checkbox">
          <input
            type="text"
            value={this.state.optionData[index]['optionText']}
            onChange={(e) => this.handleOptionsEditChange(e, index)}
            onKeyDown={({key}) => {if (key==='Enter') this.handleOptionAdd(index)}}
            placeholder="Enter an answer option..."
            disabled={!this.props.config['optionConfig']['editable']}
          />
          {this.props.config['optionConfig']['editable'] && <div className="question-option-input__options">
            <span title="Remove option" className="remove-option" onClick={() => this.handleOptionDelete(index)}><FontAwesomeIcon title="Remove" icon={faTimes} /></span>
          </div>}
        </li>
      ))
    }
    // Else if the option elem type is a normal input tag, radiobtn
    else if (this.props.config['optionConfig']['elemType'] === 'in') {
      OptionsToRender = this.state.optionData.map((data, index) => {
        const defaultText = this.props.config['optionConfig']['defaultText']
        return (
          <li key={index+elemName} className="list-item question-option-input">
            <input
              type="text"
              value={this.state.optionData[index]['optionText']}
              onChange={(e) => this.handleOptionsEditChange(e, index)}
              onKeyDown={({key}) => {if (key==='Enter') this.handleOptionAdd(index)}}
              placeholder={this.props.config['optionConfig']['editable'] ? 'Enter an answer option...' : (defaultText[index] || defaultText[0])}
              disabled={!this.props.config['optionConfig']['editable']}
            />
            {this.props.config['optionConfig']['editable'] && <div className="question-option-input__options">
              <span title="Remove option" className="remove-option" onClick={() => this.handleOptionDelete(index)}><FontAwesomeIcon icon={faTimes} /></span>
            </div>}
          </li>
        )
      })
    }
    return (
      <div onBlur={this.handleOptionsEditBlur}>
        <ul>
          {OptionsToRender}
        </ul>
      </div>
    )
  }
}

export default SurveyQuestionOptions

// Instead of the empty state data here, we will initialize the state from api call data if isEditMode is true

// Responsible for 
// - showing the option according to the option type of the parent
// - handling option input changes
// - keeping state of options count, and option values
// - adding a new option when the user clicks enter on an option column
// - removing option columns