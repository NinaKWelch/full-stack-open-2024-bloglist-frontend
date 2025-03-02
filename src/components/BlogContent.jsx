import PropTypes from 'prop-types'

const BlogContent = ({ blog, handleLikes, handleRemoveBlog, enableDelete }) => (
  <div>
    <div>{blog.url}</div>
    <div>likes: {blog.likes} <button onClick={() => handleLikes(blog)}>like</button></div>
    <div>{blog.user.username}</div>
    {enableDelete && <button onClick={() => handleRemoveBlog(blog)}>remove</button>}
  </div>  
)

BlogContent.propTypes = {
  blog: PropTypes.shape({
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  handleLikes: PropTypes.func.isRequired,
  handleRemoveBlog: PropTypes.func.isRequired,
  enableDelete: PropTypes.bool.isRequired
}


export default BlogContent



