import React, { Component } from 'react'
import serializeForm from 'form-serialize'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { postFetchById } from '../../actions/posts'
import Notfound from '../Notfound'

class HandlePost extends Component {

  constructor(props) {
    super(props)
    this.state = {
      update: {
        isUpdate: false,
        updatedValues: false
      },
      title: '',
      body: ''
    }
  }

  componentDidMount() {
    const { match = {} } = this.props
    const { params = {} } = match
    if (params.id) {
      this.props.fetchPost(params.id)
      this.setState({
        update: {
          isUpdate: true,
          updatedValues: false
        }
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    console.log(values)
  }

  handleTextChange = (event) => {
    const { name } = event.target
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    const { update, title, body } = this.state
    const { post, fetchError } = this.props
    const command = update.isUpdate === true ? 'Update' : 'Create'
    if ( !update.updatedValues ) {
      if (update.isUpdate && post.title) {
        this.setState({
          update: {
            isUpdate: true,
            updatedValues: true
          },
          title: post.title,
          body: post.body
        })
        console.log(post)
      }  
    }

    if (fetchError) {
      return <Notfound />
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="title" value={title} onChange={this.handleTextChange} />
        <textarea type="content" name="body" value={body} onChange={this.handleTextChange} />
        <button type="submit">{`${command} Post`}</button>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.post,
    fetchError: state.postsHasErrored
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchPost: (idPost) => dispatch(postFetchById(idPost))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HandlePost))