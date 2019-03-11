import React, { Component } from 'react'
import { faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PropTypes from 'prop-types'

class Navigation extends Component {
  static propTypes = {
    showNavLinks: PropTypes.bool,
    showSidebarToggleButton: PropTypes.bool
  }

  render() {
    const NavLinks = () => (
      <>
        <li className="nav-item active">
          <a className="nav-link" href="/#">Features</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/#">Pricing</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/#">Products</a>
        </li>
      </>
    )
    const ToggleSidebarButton = () => (
      <button type="button" id="sidebarCollapse" className="btn btn-info">
        <svg className="svg-inline--fa fa-align-left fa-w-14" aria-hidden="true" data-prefix="fas" data-icon="align-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="">
          <path fill="currentColor" d="M288 44v40c0 8.837-7.163 16-16 16H16c-8.837 0-16-7.163-16-16V44c0-8.837 7.163-16 16-16h256c8.837 0 16 7.163 16 16zM0 172v40c0 8.837 7.163 16 16 16h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16zm16 312h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm256-200H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16h256c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16z"></path>
        </svg>
      </button>
    )
    const ToggleNavbarButton = () => (
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    )
    const divClassName = this.props.showNavLinks ? "navbar-collapse collapse" : ""
    const absolutePos = this.props.showNavLinks ? "" : "absolute-pos"
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark justify-content-between">
        {this.props.showSidebarToggleButton && <ToggleSidebarButton />}
        <a href="/#" className="navbar-brand">SurveyFlow</a>
        {this.props.showNavLinks && <ToggleNavbarButton />}
        <div className={divClassName} id="navbarsExample04" style={{flexGrow: 0}}>
          <ul className="navbar-nav">
            {this.props.showNavLinks && <NavLinks />}
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle push-right" href="example.com" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><FontAwesomeIcon size="lg" icon={faUserCircle} /></a>
              <div className={"dropdown-menu " + absolutePos} aria-labelledby="dropdown04">
                <a className="dropdown-item" href="/#">Help</a>
                <a className="dropdown-item" href="/#">Go Pro!</a>
                <a className="dropdown-item" href="/#">Profile</a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navigation