import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogEntry from './components/BlogEntry'
import Togglable from './components/Togglable';
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [newBlog, setNewBlog] = useState(false)

  const blogEntryRef = useRef()

  useEffect(() => {
    setLoading(true)
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    setLoading(true)
    blogService.getAll()
      .then(blogs => {
        setBlogs(blogs)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (newBlog) {
      blogService.getAll()
        .then(blogs => {
          setBlogs(blogs)
        })
    }
  }, [newBlog])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handlePost = (newObject) => {
    blogEntryRef.current.toggleVisibility()
    blogService.create(newObject)
      .then(returnedBlog => {
        setNewBlog(true)
        setMessage(`A new blog: '${returnedBlog.title}'  by  '${returnedBlog.author}'  added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setNewBlog(false)
      })
      .catch(error => {
        setErrorMessage(`Please provide all the fields correctly`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      Please login
      <br></br>
      <div>
        Username
        <br></br>
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <br></br>
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <br></br>
      <button type="submit">login</button>
    </form>
  )

  const allBlogs = () => (
    <div>
      {`'${user.name}' logged in`}
      <br></br>
      <button onClick={() => logout()}>Logout</button>
      <br></br>
      <br></br>
      <Togglable buttonLabel="Add new blog" ref={blogEntryRef}>
        <BlogEntry handlePost={handlePost} />
      </Togglable>
      <br></br>
      <h2>Blogs</h2>
      {blogs && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const pageLoading = () => (
    <div>
      Login in and fetching blog entries
    </div>
  )

  return (
    <div>
      <Notification notification={message} errorMessage={errorMessage} />
      {user === null ? loginForm() : !loading ? allBlogs() : pageLoading()}
    </div>
  )
}

export default App