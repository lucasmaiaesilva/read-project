import { combineReducers } from 'redux'
import { postsIsLoading, postsHasErrored, posts } from './posts'
import { categoriesIsLoading, categoriesHasErrored, categories } from './categories'
import { commentsIsLoading, commentsHasErrored, comments } from './comments'

export default combineReducers({
  postsIsLoading,
  postsHasErrored,
  posts,
  categoriesIsLoading,
  categoriesHasErrored,
  categories,
  commentsIsLoading,
  commentsHasErrored,
  comments
})
