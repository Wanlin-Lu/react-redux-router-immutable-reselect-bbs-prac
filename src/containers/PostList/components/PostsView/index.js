import React from 'react'
import { Link } from 'react-router-dom'
import PostItem from '../PostItem'

const PostsView = ({ posts }) => {
  return (
    <ul>
      {posts.map(post => (
        <Link
          to={`/posts/${post.id}`}
          key={post.id}
        >
          <PostItem {...post} />
        </Link>
      ))}
    </ul>
  )
}

export default PostsView