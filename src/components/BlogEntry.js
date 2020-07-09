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
    <form onSubmit={(event) => addBlog(event)}>
      Create new blog entry
      <br></br>
      Title
      <input id="title" value={inputs.title} name="title" type="text" onChange={handleChange} />
      <br></br>
      Author
      <input id="author" value={inputs.author} name="author" type="text" onChange={handleChange} />
      <br></br>
      Url
      <input id="url" value={inputs.url} name="url" type="text" onChange={handleChange} />
      <br></br>
      <br></br>
      <button type="submit">Create</button>
    </form>
  )
}

export default BlogEntry



