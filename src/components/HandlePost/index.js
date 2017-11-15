import React, { Component } from 'react'
import serializeForm from 'form-serialize'

class HandlePost extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    console.log(values)
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="postTitle" />
        <textarea type="content" name="postContent" />
        <button type="submit">Create/Update Post</button>
      </form>
    )
  }
}

export default HandlePost
