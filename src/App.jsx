import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {console.log("USER", user)
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleMessage = (text, success) => {
    setMessage({ text, success })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleUpdateBlogs = async (returnedBlog) => {
    const updatedBlogs = blogs.map(blog => blog.id === returnedBlog.id ? returnedBlog : blog)
    setBlogs(updatedBlogs)
    handleMessage(`Liked ${returnedBlog.title}`, true)
  }

  const handleRemoveBlog = async (blogToDelete) => {
    if (window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}`)) {
      try {
        await blogService.remove(blogToDelete.id)
        handleMessage(`Removed ${blogToDelete.title}`, true)
        setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
    
      // eslint-disable-next-line no-unused-vars
      } catch (exception) {
        handleMessage('Failed to remove blog', false)
      }
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {message && <Notification message={message} />}
       <LoginForm setUser={setUser} handleMessage={handleMessage} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {message && <Notification message={message} />}
      <div style={{ marginBottom: 20 }}>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </div>
      <BlogForm
        blogs={blogs}
        setBlogs={setBlogs}
        handleMessage={handleMessage}
      />
      <div style={{ marginBottom: 20 }}>
        {sortedBlogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleUpdateBlogs={handleUpdateBlogs}
            handleRemoveBlog={handleRemoveBlog}
            handleMessage={handleMessage}
          />
        )}
      </div>
    </div>
  )
}

export default App
