import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { postsFetchData } from '../../actions/posts'

class Posts extends Component {
  componentDidMount() {
    this.props.fetchData()
  }
  render() {
    if (this.props.hasErrored) {
      return <h1>Sorry but there was an error while fetch</h1>
    }
    if (this.props.isLoading) {
      return <h1>Loading ...</h1>
    }
    return (
      <ul>
        {this.props.posts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      posts: state.posts,
      hasErrored: state.postsHasErrored,
      isLoading: state.postsIsLoading
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(postsFetchData())
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
