const POSTS_IS_LOADING = 'POSTS_IS_LOADING'
const POSTS_HAS_ERRORED = 'POSTS_HAS_ERRORED'
const POSTS_FETCH_DATA_SUCCESS = 'POSTS_FETCH_DATA_SUCCESS'
const POST_FETCH_BY_ID_DATA_SUCCESS = 'POST_FETCH_BY_ID_DATA_SUCCESS'
const INSERT_UPDATE_POST_SUCCESS = 'INSERT_UPDATE_POST_SUCCESS'

export function postsIsLoading(state = false, action) {
  switch (action.type) {
    case POSTS_IS_LOADING:
      return action.isLoading
    default:
      return state
  }
}

export function postsHasErrored(state = false, action) {
  switch (action.type) {
    case POSTS_HAS_ERRORED:
      return action.hasErrored
    default:
      return state
  }
}

export function posts(state = [], action) {
  switch (action.type) {
    case POSTS_FETCH_DATA_SUCCESS:
      return action.posts
    default:
      return state
  }
}

export function post(state = [], action) {
  switch (action.type) {
    case POST_FETCH_BY_ID_DATA_SUCCESS:
      return action.post
    case INSERT_UPDATE_POST_SUCCESS:
      return action.post
    default:
      return state
  }
}