import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

class App extends Component {

  componentDidMount = () => {
    const url = 'http://localhost:3001/posts'
    const headers = { 'Authorization': 'whatever-you-want' }
    axios({
      method:'get',
      url,
      headers,
    })
    .then(res => console.log(res.data))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
