import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Posts from './components/Posts'
import Post from './components/Post'
import Notfound from './components/Notfound'
import Categories from './components/Categories'
import HandlePost from './components/HandlePost'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/posts/:id" component={Post} />
          <Route path="/categories" component={Categories} />
          <Route path="/admin/post" component={HandlePost} />
          <Route path="/admin/post/:id" component={HandlePost} />
          <Route component={Notfound} />
        </Switch>
      </div>
    )
  }
}

export default App;
