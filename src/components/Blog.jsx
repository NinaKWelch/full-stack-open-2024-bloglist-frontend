import { useState } from "react";
import PropTypes from 'prop-types'

import BlogContent from './BlogContent'

const Blog = ({ blog, handleLikes, handleRemoveBlog, enableDelete }) => {
  const [show, setShow] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleShow = () => setShow(!show)

  return (
    <div style={blogStyle}>
      <div>{blog.title}, by {blog.author} <button onClick={toggleShow}>{show ? "hide" : "show"}</button></div>
      {show && (
        <BlogContent
          blog={blog}
          handleLikes={handleLikes}
          handleRemoveBlog={handleRemoveBlog}
          enableDelete={enableDelete}
        />
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
  handleLikes: PropTypes.func.isRequired,
  handleRemoveBlog: PropTypes.func.isRequired,
  enableDelete: PropTypes.bool
}


export default Blog