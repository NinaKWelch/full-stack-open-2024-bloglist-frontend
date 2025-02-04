import { useState, useRef } from "react";
import blogService from '../services/blogs'
import Togglable from './Togglable'

const BlogForm = ({ blogs, setBlogs, handleMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const blogFormRef = useRef()

  const handleCreate = async (event) => {
    event.preventDefault()

    const blogObject = { title, author, url }

    try {
      const newBlog = await blogService.create(blogObject)

      if (newBlog) {
        blogFormRef.current.toggleVisibility()
        handleMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`, true)
        setBlogs(blogs.concat(newBlog))
      }
      setTitle('')
      setAuthor('')
      setUrl('')
    // eslint-disable-next-line no-unused-vars
    } catch (exception) {
      handleMessage('Failed to create blog', false)
    }
  } 

  return (
    <Togglable buttonLabel="create new" ref={blogFormRef}>
      <form onSubmit={handleCreate}>
        <div>
          title:{' '}
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{' '}
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{' '}
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
        <button
          type="button"
          onClick={() => blogFormRef.current.toggleVisibility}
        >
          cancel
        </button>
      </form>
    </Togglable>
  )
}

export default BlogForm;