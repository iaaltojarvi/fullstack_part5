import React from 'react'

const BlogEntry = (props) => {
    return (
        <div>
            Create new blog entry
            <br></br>
      Title
            <input value={props.inputs.title} name="title" onChange={props.handleChange} />
            <br></br>
      Author
            <input value={props.inputs.author} name="author" onChange={props.handleChange} />
            <br></br>
      Url
            <input value={props.inputs.url} name="url" onChange={props.handleChange} />
            <br></br>
            <button onClick={(event) => props.handlePost(event)}>Create</button>
            <button onClick={() => props.setShowBlogEntry(false)}>Cancel</button>
        </div>
    )
}

export default BlogEntry

