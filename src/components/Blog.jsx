import { useState } from "react";
const Blog = ({ blog }) => {
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
      <div>{blog.title}, by {blog.author} <button onClick={toggleShow}>hide</button></div>
      {show && (
        <div>
          <div>{blog.url}</div>
          <div>likes: {blog.likes} <button>like</button></div>
          <div>{blog.user.username}</div>
        </div>  
      )}
    </div>  
  )
}


export default Blog