import React, { Component } from 'react'
import serializeForm from 'form-serialize'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import uuidv1 from 'uuid/v1'
import { postFetchById, insertPost, updatePost } from '../../actions/posts'
import { categoriesFetchData } from '../../actions/categories'
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
      body: '',
      author: '',
      category: ''
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
    this.props.categoriesFetchData()
  }

  componentWillReceiveProps(nextProps) {
    const { update } = this.state
    const { post } = nextProps

    if (!update.updatedValues) {
      if (update.isUpdate && post.title) {
        this.setState({
          update: {
            isUpdate: true,
            updatedValues: true
          },
          title: post.title,
          body: post.body,
          category: post.category,
          author: post.author
        })
      }
    }
  }

  handleSubmit = (e) => {
    // const { update = {} } = this.state
    // const { isUpdate ={} } = update
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
      ...values
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
    const { update, title, body, category, author } = this.state
    const { fetchError } = this.props
    const { categories = [] } = this.props.categories
    const command = update.isUpdate === true ? 'Update' : 'Create'

    if (fetchError) {
      return <Notfound />
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Title</label>
          <input type="text" name="title" value={title} onChange={this.handleTextChange} />
        </div>
        <div>
          <label>Body</label>
          <textarea type="content" name="body" value={body} onChange={this.handleTextChange} />
        </div>

        {!update.isUpdate && (
          <div>
            <div>
              <label>Categories</label>
              <select name="category" value={category}>
                {categories.length > 0 && categories.map((c) => {
                  return (
                    <option value={c.name} key={c.path}  >
                      {c.name}
                    </option>
                  )
                }
                )}
              </select>
            </div>
            <div>
              <label>Author</label>
              <input type="text" name="author" value={author} onChange={this.handleTextChange} />
            </div>
          </div>
        )}
        <button type="submit">{`${command} Post`}</button>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.post,
    fetchError: state.postsHasErrored,
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchPost: (idPost) => dispatch(postFetchById(idPost)),
  insertPost: (post) => dispatch(insertPost(post)),
  updatePost: (id, post) => dispatch(updatePost(id, post)),
  categoriesFetchData: () => dispatch(categoriesFetchData())
  // para o método de update mandar somente o id e no objeto post mandar somente o title, post
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HandlePost))