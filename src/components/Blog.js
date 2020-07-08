import React, { useState } from 'react'
import blogService from '../services/blogs'
import Notification from './Notification';
import './Blog.css'

const Blog = ({ blog, remove, user }) => {
  const [showBlogMore, setShowBlogMore] = useState(false)
  const [oneBlog, setOneBlog] = useState({ title: '', author: '', url: '', likes: '' })
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const showMore = () => {
    setShowBlogMore(!showBlogMore)
  }

  const handleLike = async (event) => {
    event.preventDefault()
    const likes = blog.likes + 1
    const newObject = { ...blog, likes }
    blogService
      .update(blog.id, newObject)
      .then(returnedBlog => {
        setMessage('You liked this blog')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setOneBlog({ ...blog, likes })
      })
      .catch(error => {
        console.log(`Error in updating likes: ${error.message}`)
        setErrorMessage('Could not like, try again later')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleRemove = (id) => {
    id = blog.id
    remove(id)
  }

  return (
    <div className="blog">
      {blog.title}
      <br></br>
      {showBlogMore ? (
        <>
          {`Author: '${blog.author}'`}
          <br></br>
          {`Likes: ${oneBlog.likes !== '' ? oneBlog.likes : blog.likes}`}
          <button onClick={(event) => handleLike(event)}>Like</button>
          <br></br>
          {`Url: ${blog.url}`}
          <br></br>
          <button onClick={() => showMore()}>Hide</button>
          <br></br>
          {blog.user && user && user.username === blog.user.username &&
            <button onClick={(id) => handleRemove(id)}>Remove</button>
          }
          {message !== null &&
            <Notification notification={message} errorMessage={errorMessage} />
          }
        </>
      ) : (
          <button onClick={() => showMore()}>Show more</button>
        )
      }
    </div>
  )
}

export default Blog
