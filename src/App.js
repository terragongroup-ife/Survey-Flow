import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import AncestorComponent from './components/LoginPage'
import logo from './logo.svg';
import './App.css';

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
