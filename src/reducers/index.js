import { combineReducers } from 'redux'
import { postsIsLoading, postsHasErrored, posts } from './posts'
import { categoriesIsLoading, categoriesHasErrored, categories } from './categories'

export default combineReducers({
  postsIsLoading,
  postsHasErrored,
  posts,
  categoriesIsLoading,
  categoriesHasErrored,
  categories
})
