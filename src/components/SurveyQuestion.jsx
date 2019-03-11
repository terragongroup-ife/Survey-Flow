import React, { PureComponent } from 'react'
import ContentEditable from 'react-contenteditable'
import SurveyQuestionOptions from './SurveyQuestionOptions'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faTrash } from '@fortawesome/free-solid-svg-icons';
import SurveyOptionQuestionLinkPicker from './SurveyOptionQuestionLinkPicker';

class SurveyQuestion extends PureComponent {

  constructor(props) {
    super(props)
    this.contentEditable = React.createRef()
    this.optionsType = [
      {
        optionType: 'multipleChoice',
        title: 'Survey fillers can choose only one answer from a list of choices',
        name: 'Multiple Choice',
        optionConfig: {
          elemType: 'in',
          editable: true,
          defaultNo: 4,
          defaultText: [
            'Enter an answer option'
          ]
        }
      },
      {
        optionType: 'text',
        title: 'Survey fillers can write in a short text or numerical answer to your question',
        name: 'Text',
        optionConfig: {
          elemType: 'ce',
          editable: false,
          defaultNo: 1,
          defaultText: [
            'Text here'
          ]
        }
      },
      {
        optionType: 'checkbox',
        title: 'Survey fillers can select all choices that apply to them',
        name: 'Checkbox',
        optionConfig: {
          elemType: 'cb',
          editable: true,
          defaultNo: 3,
          defaultText: [
            'Enter an answer option'
          ]
        }
      },
      {
        optionType: 'linearScale',
        title: 'Respondents can rate an item or question by dragging an interactive slider',
        name: 'Linear Scale (Range)',
        optionConfig: {
          elemType: 'ls',
          editable: true,
          defaultNo: 1,
          defaultText: [1, 10]
        }
      }
    ]
    const {isLinked, question_id, question, optionsType, options} = this.props.question
    this.state = {
      isLinked,
      question_id,
      question,
      optionsType,
      options,
      required: true
    }
  }

  static propTypes = {
    tabIndex: PropTypes.number,
    handleQuestionFieldBlur: PropTypes.func,
    handleOptionTypeChange: PropTypes.func,
    handleAddLinkedQuestion: PropTypes.func,
    handleQuestionDelete: PropTypes.func,
    question: PropTypes.object,
    nextQuestions: PropTypes.array
  }

  handleQuestionFieldChange = e => {
    // Update the current state when value of elem is changed
    const value = e.target.value
    this.setState(() => ({
      question: value
    }))
  }

  handleQuestionFieldBlur = () => {
    // Submit the current question state to the parent component when elem loses focus
    this.props.handleQuestionFieldBlur(this.state.question_id, this.state.question)
  }

  handleOptionTypeChange = (e) => {
    // Call the parent handler to change the option type
    const value = e.target.value
    this.props.handleOptionTypeChange(this.state.question_id, value)
  }

  handleOptionsEditBlur = (newState) => {
    // Submit the current option state to the parent component when elem loses focus
    this.setState(() => ({
      options: newState
    }), () => this.props.handleOptionsEditBlur(this.state.question_id, this.state.options))
  }

  handleAddLinkedQuestion = (nextId) => {
    // Do something here
    this.props.handleAddLinkedQuestion(nextId)
  }

  handleQuestionDelete = () => {
    // Call the prop func for deleting the current questionId
    this.props.handleQuestionDelete(this.state.question_id)
  }

  handleClosePicker = (updatedOptions) => {
    // Save the returned options and their linkIds before setting state
    this.setState(() => ({
      options: updatedOptions,
      showOptionsLinkPicker: false
    }), () => this.props.handleOptionsEditBlur(this.state.question_id, this.state.options))
  }

  handleRequiredOptionToggle = (checked) => {
    this.setState(() => ({
      required: checked
    }))
  }

  componentDidUpdate = (prevProps, prevState) => {
    // Update the state when the optionsType prop changes
    if (prevProps.question.optionsType !== this.props.question.optionsType) {
      this.setState(() => ({
        optionsType: this.props.question.optionsType,
        options: []
      }))
    }
  }

  render() {
    // Generate the options
    const OptionTypes = this.optionsType.map(optionType => (
      <option
        key={optionType.optionType}
        value={optionType.optionType}
        title={optionType.title}
      >
        {optionType.name}
      </option>
    ))

    // Generate the appropriate option configs for diff types
    const SurveyOptionsConfig = this.optionsType.filter(value => value.optionType === this.state.optionsType)

    // Render the question, option type selector, and the options
    return (
      <div className="survey-question" tabIndex={this.props.tabIndex}>
        <span>{this.props.question.question_no}</span>
        <div className="survey-question__question">
          <div className="question-group">
            <ContentEditable
              innerRef={this.contentEditable}
              html={this.state.question} // innerHTML of the editable div
              disabled={false}       // use true to disable editing
              onChange={this.handleQuestionFieldChange} // handle innerHTML change
              onBlur={this.handleQuestionFieldBlur}
              className='question-input'
              data-ph="Type question here..."
              tagName='div' // Custom HTML tag (uses a div by default)
            />
          </div>
          <div className="select-options">
            <div className="form-group">
              <label htmlFor="option-type-selector">Choose Response Type</label>
              <select
                value={this.state.optionsType}
                onChange={this.handleOptionTypeChange}
                className="form-control"
                id="option-type-selector"
              >
                {OptionTypes}
              </select>
            </div>
          </div>
        </div>
        <div className="survey-options">
          <SurveyQuestionOptions
            config={SurveyOptionsConfig[0]}
            currentData={this.state.options}
            handleOptionsEditBlur={this.handleOptionsEditBlur}
            handleAddLinkedQuestion={this.handleAddLinkedQuestion}
          />
        </div>
        <div className="question-actions">
          <span className="delete-question" title="Remove question" onClick={this.handleQuestionDelete}><FontAwesomeIcon icon={faTrash} /></span>
          {this.state.optionsType !== 'text' && <span title="Add logic jump to question" onClick={() => this.setState(() => ({showOptionsLinkPicker: true}))} className="link-question"><FontAwesomeIcon icon={faLink} /></span>}
          <span title="Make question compulsory" className="question-required">
            <span>Required</span>
            <div className="require-switch">
              <input
                type="checkbox"
                id={"require-question" + this.props.question.question_no}
                checked={this.state.required}
                onChange={({target: {checked}}) => this.handleRequiredOptionToggle(checked)}
              />
              <label htmlFor={"require-question" + this.props.question.question_no}></label>
            </div>
          </span>
        </div>
        {this.state.showOptionsLinkPicker && <SurveyOptionQuestionLinkPicker
          handleSave={this.handleClosePicker}
          availableQuestions={this.props.nextQuestions}
          currentOptions={[...this.state.options]}
        />}
      </div>
    )
  }
}

export default SurveyQuestion


// CURRENTLY
// # working on the link question ft
// # working on the add option ft
// - parsing the total questions data for api call
// - will work on adding sections






// {
//   optionType: 'bool',
//   name: 'True / False',
//   optionConfig: {
//     elemType: 'in',
//     editable: false,
//     defaultNo: 2,
//     defaultText: [
//       'True',
//       'False'
//     ]
//   }
// },
// {
//   optionType: 'polar',
//   name: 'Yes / No / Maybe',
//   optionConfig: {
//     elemType: 'in',
//     editable: false,
//     defaultNo: 3,
//     defaultText: [
//       'Yes',
//       'No',
//       'Maybe'
//     ]
//   }
// },