import React, { useState } from 'react'
import './Blog.css'

const Blog = ({ blog, remove, user, addOneLike }) => {
  const [showBlogMore, setShowBlogMore] = useState(false)

  const showMore = () => {
    setShowBlogMore(!showBlogMore)
  }

  const handleLike = async (event) => {
    event.preventDefault()
    blog.likes += 1
    addOneLike(blog)
  }

  const handleRemove = (id) => {
    id = blog.id
    remove(id)
  }

  return (
    <div className="blog">
      {`'${blog.title}' by '${blog.author}'`}
      <br></br>
      {showBlogMore ? (
        <div>
          {`Likes: ${blog.likes}`}
          <button onClick={(event) => handleLike(event)}>Like</button>
          <br></br>
          {`Url: ${blog.url}`}
          <br></br>
          <button onClick={() => showMore()}>Hide</button>
          <br></br>
          {blog.user && user && user.username === blog.user.username &&
            <button onClick={(id) => handleRemove(id)}>Remove</button>
          }
        </div>
      ) : (
        <button onClick={() => showMore()}>Show more</button>
      )
      }
    </div>
  )
}

export default Blog































































