import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default (props) => {
  return (
    <div className="custom-loading text-center">
      <div>
        <p><FontAwesomeIcon spin size="2x" icon={faSpinner}/></p>
        <p>Please wait. {props.message || 'Just getting this page ready'}...</p>
      </div>
    </div>
  )
}