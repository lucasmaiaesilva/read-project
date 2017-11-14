const COMMENTS_IS_LOADING = 'COMMENTS_IS_LOADING'
const COMMENTS_HAS_ERRORED = 'COMMENTS_HAS_ERRORED'
const COMMENTS_FETCH_DATA_SUCCESS = 'COMMENTS_FETCH_DATA_SUCCESS'

export function commentsIsLoading(state = false, action) {
  switch (action.type) {
      case COMMENTS_IS_LOADING:
          return action.isLoading
      default:
          return state
  }
}

export function commentsHasErrored(state = false, action) {
  switch (action.type) {
      case COMMENTS_HAS_ERRORED:
          return action.hasErrored
      default:
          return state
  }
}

export function comments(state = [], action) {
  switch (action.type) {
      case COMMENTS_FETCH_DATA_SUCCESS:
          return action.comments
      default:
          return state
  }
}