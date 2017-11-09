import { get } from '../utils/api'

export function postsIsLoading(bool) {
  return {
    type: 'POSTS_IS_LOADING',
    isLoading: bool
  }
}

export function postsHasErrored(bool) {
  return {
      type: 'POSTS_HAS_ERRORED',
      hasErrored: bool
  }
}

export function postsFetchDataSuccess(posts) {
  return {
    type: 'POSTS_FETCH_DATA_SUCCESS',
    posts
  }
}

export function postsFetchData() {
  const url = 'http://localhost:3001/posts'
  return (dispatch) => {
    dispatch(postsIsLoading(true))
    get(url)
      .then(res => {
        dispatch(postsIsLoading(false))
        return res.data
      })
      .then(posts => dispatch(postsFetchDataSuccess(posts)))
      .catch(() => dispatch(postsHasErrored(true)))
  }
}