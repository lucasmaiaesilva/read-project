import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
// import { confirm } from '../../utils/alerts'
import { postsFetchData, deletePost } from '../../actions/posts'
import { handleVoteScore } from '../../actions/votescore'
import Header from '../Header'
import VoteScore from '../VoteScore'

class Posts extends Component {
  componentDidMount() {
    this.listPosts()
  }

  componentWillReceiveProps(nextProps) {
    const { match = {} } = nextProps
    const { params = {} } = match
    const changedRouteCategory = params.category
    const actualCategory = this.getCategoryName()
    if (changedRouteCategory !== actualCategory) {
      this.props.fetchData(changedRouteCategory)
    }
  }

  listPosts = () => {
    const category = this.getCategoryName()
    if (this.isRenderedByCategory()) {
      this.props.fetchData(category)
    } else {
      this.props.fetchData()
    }
  }

  isRenderedByCategory = () => {
    return !!this.getCategoryName()
  }

  getCategoryName = () => {
    const { match = {} } = this.props
    const { params = {} } = match
    return params.category
  }

  onDeletePost = async (id) => {
    const resultConfirm = window.confirm('Are You Sure you want to Delete this item?')
    if (resultConfirm) {
      await this.props.deletePost(id)
      this.props.fetchData()
    }
  }

  handleScore = async (id, value) => {
    const { handleScore } = this.props
    // http post on /comments/:id for voteScore comment
    const url = `http://localhost:3001/posts/${id}`
    const res = { option: value }
    await handleScore(url, res)
    this.listPosts()
  }

  render() {
    const { posts, hasErrored, isLoading } = this.props
    const message = this.getCategoryName()
      ? `List all posts of ${this.getCategoryName()}`
      : 'List all posts'
    if (hasErrored) {
      return <h1>Sorry but there was an error while fetch</h1>
    }
    if (isLoading) {
      return <h1>Loading ...</h1>
    }
    return (
      <div>
        <Header />
        <h1>{message}</h1>
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
              <div>Author: <strong>{post.author}</strong></div>
              <div>Category: <strong> {post.category} </strong></div>
              <div><strong>{post.commentCount}</strong> Comments</div>
              <VoteScore id={post.id} handleScore={this.handleScore} score={post.voteScore} />
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
  fetchData: (idCategory) => dispatch(postsFetchData(idCategory)),
  deletePost: (idPost) => dispatch(deletePost(idPost)),
  handleScore: (url, value) => dispatch(handleVoteScore(url, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
