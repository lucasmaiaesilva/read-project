import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { postsFetchData, deletePost } from '../../actions/posts'

class Posts extends Component {
  componentDidMount() {
    this.props.fetchData()
    const { match = {} } = this.props
    const { params = {} } = match
    console.log(!!params.category)
  }

  onDeletePost = (id) => {
      const resultConfirm = window.confirm('Delete this item')

      if (resultConfirm) {
        this.props.deletePost(id)
      }
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
        <Link to='/admin/post'>CREATE NEW POST</Link>
        <h1> List all posts of React </h1>
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <Link to={{
                pathname: `/${post.category}/${post.id}`
              }}>
                {post.title}
              </Link>
              <span> - </span>
              <Link to={`/admin/post/${post.id}`}>
                ( edit this post )
              </Link>
              <button onClick={() => this.onDeletePost(post.id)}> Delete </button>

              <div>
                Author: <b>{post.author}</b>
              </div>
              <div>
                <b>{post.commentCount}</b> Comments
              </div>
              <div>
                <button> - </button>
                <b>{post.voteScore}</b> Votes
              <button> + </button>
              </div>
            </li>
          ))}
        </ul>
        
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
  fetchData: () => dispatch(postsFetchData()),
  deletePost: (idPost) => dispatch(deletePost(idPost))
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
