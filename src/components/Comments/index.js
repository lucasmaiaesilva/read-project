import React from 'react'

const Comments = ({ data, isLoading }) => {
  if(isLoading) {
    return <h2>Loading Comments...</h2>
  }
  return (
    <div>
      <h2>Comments</h2>
      {data.map(comment => (
        <p key={comment.id}>{comment.body}</p>
      ))}
    </div>
  )
}

export default Comments
