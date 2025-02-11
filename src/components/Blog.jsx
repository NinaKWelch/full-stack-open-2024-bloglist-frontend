import { useState } from "react";
import PropTypes from 'prop-types'

import blogService from '../services/blogs'

const Blog = ({ blog, handleUpdateBlogs, handleRemoveBlog, handleMessage, enableDelete }) => {
  const [show, setShow] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleShow = () => setShow(!show)

  const handleLikes = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
 
    try {
      const returnedBlog = await blogService.update(updatedBlog)

      if (returnedBlog) {
        handleUpdateBlogs(returnedBlog) 
      }
      
    // eslint-disable-next-line no-unused-vars
    } catch (exception) {
      handleMessage('Failed to update blog', false)
    }
  }

  return (
    <div style={blogStyle}>
      <div>{blog.title}, by {blog.author} <button onClick={toggleShow}>{show ? "hide" : "show"}</button></div>
      {show && (
        <div>
          <div>{blog.url}</div>
          <div>likes: {blog.likes} <button onClick={handleLikes}>like</button></div>
          <div>{blog.user.username}</div>
          {enableDelete && <button onClick={() => handleRemoveBlog(blog)}>remove</button>}
        </div>  
      )}
    </div>  
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  handleUpdateBlogs: PropTypes.func.isRequired,
  handleRemoveBlog: PropTypes.func.isRequired,
  handleMessage: PropTypes.func.isRequired
}


export default Blog