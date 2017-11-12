const POSTS_IS_LOADING = 'POSTS_IS_LOADING'
const POSTS_HAS_ERRORED = 'POSTS_HAS_ERRORED'
const POSTS_FETCH_DATA_SUCCESS = 'POSTS_FETCH_DATA_SUCCESS'

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