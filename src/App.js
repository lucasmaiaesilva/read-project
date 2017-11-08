import React, { Component } from 'react';
import axios from 'axios';

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
        <h1>Hello world!</h1>
      </div>
    );
  }
}

export default App;
