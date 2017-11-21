import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import VoteScore from '../VoteScore'
import { deleteComment, commentsFetchData } from '../../actions/comments'
import { handleVoteScore } from '../../actions/votescore'
import { connect } from 'react-redux'

const onDeleteComment = async (id, props) => {
  const { idPost, deleteComment, fetchComments } = props
  const resultConfirm = window.confirm('Delete this item')
  if (resultConfirm) {
    await deleteComment(id)
    fetchComments(idPost)
  }
}

const handleScore = async (id, value, props) => {
  const { idPost, handleScore, fetchComments } = props
  const url = `http://localhost:3001/comments/${id}`
  const res = { option: value }
  await handleScore(url, res)
  fetchComments(idPost)
}


const Comments = (props) => {
  const { hasErrored, isLoading, data, idPost } = props
  
  if (hasErrored) {
    return <h1>Sorry but there was an error while fetch</h1>
  }
  if (isLoading) {
    return <h1>Loading ...</h1>
  }
  
  const parentId = data.length > 0 ? data[0].parentId : ''
  
  return (
    <div>
      <div>
        <h2>Comments</h2>
        <Link to={`/admin/comment/${idPost}`}>Add new COMMENT</Link>
        <ul>
          {data.map(comment => (
            <li key={comment.id}>
              <div>{comment.body}</div>

              <Link to={`/admin/comment/${parentId}/${comment.id}`}>
                ( edit this comment )
              </Link>

              <button onClick={() => onDeleteComment(comment.id, props)}> Delete </button>

              <div>
                Author: <b>{comment.author}</b>
              </div>
              <div>
                <b>{comment.commentCount}</b> Comments
              </div>

              <VoteScore id={comment.id} handleScore={handleScore} score={comment.voteScore} />
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}


const mapStateToProps = (state) => ({
  data: state.comments,
  isLoading: state.commentsIsLoading,
  hasErrored: state.commentsHasErrored,
})

const mapDispatchToProps = (dispatch) => ({
  deleteComment: (idComment) => dispatch(deleteComment(idComment)),
  fetchComments: (idPost) => dispatch(commentsFetchData(idPost)),
  handleScore: (url, value) => dispatch(handleVoteScore(url, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(Comments)