import React from 'react'
import errorImage from '../assets/img/no-bg/error-404-desktop.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export default (props) => {
  return (
    <div className="custom-404-page text-center">
      <div>
        <img
          className="img-fluid"
          style={{filter: 'opacity(.5) drop-shadow(0 0 0 blue)'}}
          src={errorImage} alt="Error 404"
        />
        <h3>Nothing here!</h3>
        <p>{props.message || "You've hit a dead end!!! Go to our home page instead"}</p>
        <a href="/"><button className="btn btn-custom"><FontAwesomeIcon icon={faHome}/> Home</button></a>
      </div>
    </div>
  )
}