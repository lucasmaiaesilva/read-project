import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Posts from './components/Posts'
import Notfound from './components/Notfound'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route component={Notfound} />
        </Switch>
      </div>
    )
  }
}

export default App;
