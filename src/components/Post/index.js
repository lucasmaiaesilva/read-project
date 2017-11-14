import React, { Component } from 'react'
import { connect } from 'react-redux'
import { commentsFetchData } from '../../actions/comments'
import { get } from '../../utils/api'
import Comments from '../Comments'

class Post extends Component {
  constructor (props) {
    super(props)
    this.state = {
      post: [],
      isLoading: false
    }
  }
  componentDidMount() {
    const { id } = this.props.match.params
    const urlPost = `http://localhost:3001/posts/${id}`
    this.fetchData(urlPost, 'post')
    this.props.fetchComments(id)
  }

  fetchData(url, key) {
    this.setState({
      isLoading: true
    })
    get(url)
      .then(res => this.setState({
        [key]: res.data,
        isLoading: false,
      }))
  }

  render () {
    const { post, isLoading } = this.state
    if (isLoading) {
      return <h1>Loading...</h1>
    }
    return (
      <article>
        <h1>{post.title}</h1>
        <div>
          {post.body}
        </div>
        <Comments
          isLoading={this.props.c_isLoading}
          data={this.props.comments}
        />
      </article>
    )
  }
}

const mapStateToProps = (state) => ({
  comments: state.comments,
  c_hasErrored: state.commentsHasErrored,
  c_isLoading: state.commentsIsLoading
})

const mapDispatchToProps = (dispatch) => ({
  fetchComments: (idPost) => dispatch(commentsFetchData(idPost))
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)
