import React, { Component } from 'react'

class SidebarNavigation extends Component {
  render() {
    return (
      <div className="wrapper">
        <nav id="sidebar">
          <div className="sidebar-header">
              <h3> </h3>
          </div>
          <ul className="list-unstyled components">
            <p>Your categories</p>
            <li className="active">
              <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Job Applications</a>
              <ul className="collapse list-unstyled" id="homeSubmenu">
                <li>
                  <a href="/#">Internship role form</a>
                </li>
                <li>
                  <a href="/#">Accountant role form</a>
                </li>
                <li>
                  <a href="/#">Home 3</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="/#">Research</a>
            </li>
            <li>
              <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Invitation</a>
              <ul className="collapse list-unstyled" id="pageSubmenu">
                <li>
                  <a href="/#">Page 1</a>
                </li>
                <li>
                  <a href="/#">Page 2</a>
                </li>
                <li>
                  <a href="/#">Page 3</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="/#">Registration</a>
            </li>
            <li>
              <a href="/#">Project Evaluation</a>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default SidebarNavigation