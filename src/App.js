import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Posts from './components/Posts'
import Post from './components/Post'
import Notfound from './components/Notfound'
import HandlePost from './components/HandlePost'
import HandleComment from './components/HandleComment'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/admin/post/:id" component={HandlePost} />
          <Route path="/admin/post" component={HandlePost} />
          <Route path="/admin/comment/:idPost/:id" component={HandleComment} />
          <Route path="/admin/comment/:idPost" component={HandleComment} />
          <Route path="/:category/:id" component={Post} />
          <Route path="/:category" component={Posts} />
          <Route exact path="/" component={Posts} />
          <Route component={Notfound} />
        </Switch>
      </div>
    )
  }
}

export default App
