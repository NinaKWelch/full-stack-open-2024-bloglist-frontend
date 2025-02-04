import { useState } from "react";
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, handleMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [open, setOpen] = useState(false)

  const toggleIsOpen = () => setOpen(!open)

  const handleCreate = async (event) => {
    event.preventDefault()

    const blogObject = { title, author, url }

    try {
      const newBlog = await blogService.create(blogObject)

      if (newBlog) {
        handleMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`, true)
        setBlogs(blogs.concat(newBlog))
        toggleIsOpen()  
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
    <div style={{ marginBottom: 20 }}>
      {!open && <button onClick={toggleIsOpen}>Create new</button>}
      {open && (
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
        <div><button type="submit">create</button></div>
        <div><button onClick={toggleIsOpen}>cancel</button></div>
      </form>
      )}

    </div>
  )
}

export default BlogForm;