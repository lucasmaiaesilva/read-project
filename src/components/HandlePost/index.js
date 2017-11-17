import React, { Component } from 'react'
import serializeForm from 'form-serialize'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import uuidv1 from 'uuid/v1'
import { postFetchById, insertPost, updatePost } from '../../actions/posts'
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
    const { update = {} } = this.state
    const { isUpdate ={} } = update
    // separar os ambientes aqui e verificar se o isUpdate for true, usar o método de insert post,
    // mas se for false, usar o método de update post e não esquecer de passar o id,
    // se for usado o método de createPost no final dele redirecionar a rota para /admin/post/{idPost},
    // qualquer dúvida olhar o módulo { Redirect } do react-router-dom mas isso somente para o ambiente
    // de criar novos posts, porque a partir do momento que tiverem o id na url já estarão no ambiente 
    // de update de post, ver também a possibilidade de inserir os posts em markdown e fazer preview deles
    // na mesma tela, mas isso é detalhe pode ser visto posteriormente
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    const post = {
      id: uuidv1(),
      timestamp: Date.now(),
      ...values,
      author: 'qualquer um',
      category: 'react'
    }
    this.props.insertPost(post)
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
        // console.log(post)
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
  fetchPost: (idPost) => dispatch(postFetchById(idPost)),
  insertPost: (post) => dispatch(insertPost(post)),
  updatePost: (id, post) => dispatch(updatePost(id, post))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HandlePost))