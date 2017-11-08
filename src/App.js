import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Posts from './Components/Posts'
import NotFound from './Components/NotFound'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Route path="/" component={Posts} exact />
        <Route path="/not-found" component={NotFound} exact />
      </div>
    )
  }
}

export default App;
