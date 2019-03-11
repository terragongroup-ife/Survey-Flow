import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import AncestorComponent from './components/AncestorComponent'
import './assets/css/bootstrap.css'
import './app.css'

class App extends Component {
  
  render() {
    return (
      <Router>
        <AncestorComponent/>
      </Router>
    )
  }
}

export default App;
