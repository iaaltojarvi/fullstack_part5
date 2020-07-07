import React, { useState } from 'react'
import './Blog.css'

const Blog = ({ blog }) => {
  const [showBlogMore, setShowBlogMore] = useState(false)

  const showMore = () => {
    setShowBlogMore(!showBlogMore)
  }

  return (
    <div className="blog">
      {blog.title}
      <br></br>
      {showBlogMore ? (
        <>
          {`Author: '${blog.author}'`}
          <br></br>
          {`Likes: ${blog.likes}`}
          <br></br>
          <button onClick={() => showMore()}>Hide</button>
        </>
      ) : (
          <button onClick={() => showMore()}>Show more</button>
        )
      }
    </div>
  )
}

export default Blog
