import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLikeClick }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 3,
    paddingLeft: 4,
    paddingBottom: 3,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author}&nbsp;
        <button type='button' onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      <div style={showWhenVisible}>
        {blog.url}
        <br />
        likes: {blog.likes}&nbsp;<button onClick={handleLikeClick}>like</button>
        <br />
        {blog.user.name}
        <br />
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikeClick: PropTypes.func.isRequired
}

export default Blog
