import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { postsFetchData } from '../../actions/posts'

class Posts extends Component {
  componentDidMount() {
    this.props.fetchData()
  }
  render() {
    const { posts, hasErrored, isLoading } = this.props      
    if (hasErrored) {
      return <h1>Sorry but there was an error while fetch</h1>
    }
    if (isLoading) {
      return <h1>Loading ...</h1>
    }
    return (
      <div>
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <Link to={{
                pathname: `/posts/${post.id}`
              }}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
        <Link to='/admin/post'>CREATE NEW POST</Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts,
  hasErrored: state.postsHasErrored,
  isLoading: state.postsIsLoading
})

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(postsFetchData())
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
