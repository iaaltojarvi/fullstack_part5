import React, { useState } from 'react'

const BlogEntry = ({ handlePost }) => {
  const [inputs, setInputs] = useState({ title: '', author: '', url: '' })

  const addBlog = (event) => {
    event.preventDefault()
    const newObject = {
      title: inputs.title,
      author: inputs.author,
      url: inputs.url
    }
    handlePost(newObject)
    setInputs({ title: '', author: '', url: '' })
  }

  const handleChange = (event) => {
    event.persist()
    setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }))
  }

  return (
    <>
      Create new blog entry
      <br></br>
      Title
      <input value={inputs.title} name="title" onChange={handleChange} />
      <br></br>
      Author
      <input value={inputs.author} name="author" onChange={handleChange} />
      <br></br>
      Url
      <input value={inputs.url} name="url" onChange={handleChange} />
      <br></br>
      <br></br>
      <button onClick={(event) => addBlog(event)}>Create</button>
    </>
  )
}

export default BlogEntry



