import React, { Component } from 'react'
import serializeForm from 'form-serialize'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { postFetchById } from '../../actions/posts'


class HandlePost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isUpdate: false   
    }
  }
  componentDidMount() {
    const { match = {} } = this.props
    const { params = {} } = match
    if (params.id) {
      // update method
      this.setState({
        isUpdate: true
      })
    }
    // this.props.fetchPost(params.id)
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    // console.log(values)
  }
  render() {
    const { isUpdate } = this.state
    const command = isUpdate === true ? 'Update' : 'Create'
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" name="postTitle" />
        <textarea type="content" name="postContent" />
        <button type="submit">{`${command} Post`}</button>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {}
}

const mapDispatchToProps = (dispatch) => ({
  fetchPost: (idPost) => dispatch(postFetchById(idPost))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HandlePost))
