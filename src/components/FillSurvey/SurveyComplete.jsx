import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';


class SurveyComplete extends Component {

  constructor(props) {
    super(props)
    this.surveyId = this.props.surveyId
    this.data = this.props.data
    this.state = {
      submitted: false
    }
  }

  handleSurveySubmit = () => {
    this.setState(() => ({
      loading: true
    }))
    fetch('https://young-anchorage-24773.herokuapp.com/post-response', {
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      method: "POST",
      body: JSON.stringify({ surveyId: this.surveyId, surveyResponses: this.data })
    })
      .then(res => res.json())
      .then(res => {
        if (res.code === 200) {
          this.setState(() => ({
            submitted: true,
            loading: false,
            error: false
          }));
        }
        else {
          this.setState(() => ({
            submitted: false,
            loading: false,
            error: true
          }));
        }
      })
      .catch(err => {
        console.log('Error:', err);
        this.setState(() => ({
          submitted: false,
          loading: false,
          error: true
        }))
      })
  }

  render() {
    return (
      <div className="text-center">
        <div>
          <p style={{ color: '#f6fafb', fontSize: '60px', lineHeight: '100%' }}>Thanks for filling the survey.</p>
          <p style={{ color: '#544c34', fontSize: 'x-large' }}>Go ahead and submit your responses</p>
        </div>
        <div>
          <button disabled={this.state.submitted || this.state.loading} onClick={this.handleSurveySubmit} className="btn btn-response">
            {this.state.loading && <FontAwesomeIcon size="1x" pulse icon={faCompactDisc} />} Submit responses
            </button>
          {this.state.submitted && <div style={{ margin: '1rem 0 0 0' }} className="alert alert-success fade show"><span style={{ color: '#544c34' }}>Your responses are saved successfully!</span></div>}
          {this.state.error && <div style={{ margin: '1rem 0 0 0' }} className="alert alert-warning fade show"><span style={{ color: '#544c34' }}>There is an error saving your responses. Please try again.</span></div>}
        </div>
      </div>
    )
  }
}


export default SurveyComplete