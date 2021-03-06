import React from 'react'
import { getFormatDate } from '../../../../utils/date' 
import './style.css'

const CommentsView = ({comments}) => (
  <ul className="commentsView">
    {comments.map(item => (
      <li key={item.id}>
        <div>{item.content}</div>
        <div className="sub">
          <span>{item.author.username || ''}</span>
          <span>.</span>
          <span>{getFormatDate(item.updatedAt)}</span>
        </div>
      </li>
    ))}
  </ul>
)

export default CommentsView