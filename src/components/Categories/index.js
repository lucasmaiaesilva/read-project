import React, { Component } from 'react'
import { connect } from 'react-redux'
import { categoriesFetchData } from '../../actions/categories'

class Categories extends Component {
  componentDidMount() {
    this.props.fetchData()
  }
  render() {
    const { categories = [] } = this.props.categories
    if (this.props.hasErrored) {
      return <h1>Sorry but there was an error while fetch</h1>
    }
    if (this.props.isLoading) {
      return <h1>Loading ...</h1>
    }
    return (
      <ul>
        {categories.length > 0 && categories.map(category => (
          <li key={category.name}>
            {category.name}
          </li>
        ))}
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    isLoading: state.categoriesIsLoading,
    hasErrored: state.categoriesHasErrored
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(categoriesFetchData())
})

export default connect(mapStateToProps, mapDispatchToProps)(Categories)