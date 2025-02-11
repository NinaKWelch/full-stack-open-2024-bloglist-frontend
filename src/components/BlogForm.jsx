import { useState, useRef } from "react";
import PropTypes from 'prop-types'

import blogService from '../services/blogs'

import Togglable from './Togglable'

const BlogForm = ({ handleCreateBlog, handleMessage }) => {
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
        handleCreateBlog(newBlog)
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
            data-testid='title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:{' '}
          <input
            type="text"
            value={author}
            data-testid='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:{' '}
          <input
            type="text"
            value={url}
            data-testid='url'
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

BlogForm.propTypes = {
  handleCreateBlog: PropTypes.func.isRequired,
  handleMessage: PropTypes.func.isRequired
}

export default BlogForm;