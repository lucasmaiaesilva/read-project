import React, { Component } from 'react'

class Post extends Component {
  render () {
    console.log(this.props.match.params.id)
    return <h1>Post Page {this.props.match.params.id}</h1>
  }
}

export default Post
