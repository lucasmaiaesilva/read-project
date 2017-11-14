import { get } from '../utils/api'

export function commentsIsLoading (bool) {
  return {
    type: 'COMMENTS_IS_LOADING',
    isLoading: bool
  }
}

export function commentsHasErrored (bool) {
  return {
    type: 'COMMENTS_HAS_ERRORED',
    hasErrored: bool
  }
}

export function commentsFetchDataSuccess (comments) {
  return {
    type: 'COMMENTS_FETCH_DATA_SUCCESS',
    comments
  }
}

export function commentsFetchData(postId) {
  const url = `http://localhost:3001/posts/${postId}/comments`
  return (dispatch) => {
    dispatch(commentsIsLoading(true))
    get(url)
      .then(res => {
        dispatch(commentsIsLoading(false))
        return res.data
      })
      .then(comments => dispatch(commentsFetchDataSuccess(comments)))
      .catch(() => dispatch(commentsHasErrored(true)))
  }
}