import { combineReducers } from 'redux'
import { postsIsLoading, postsHasErrored, posts, post } from './posts'
import { categoriesIsLoading, categoriesHasErrored, categories } from './categories'
import { commentsIsLoading, commentsHasErrored, comments, comment } from './comments'

export default combineReducers({
  postsIsLoading,
  postsHasErrored,
  posts,
  post,
  categoriesIsLoading,
  categoriesHasErrored,
  categories,
  commentsIsLoading,
  commentsHasErrored,
  comments,
  comment
})
