import PropTypes from 'prop-types'

const Blog = ({blog}) => (
  <div>
    {blog.title} by {blog.author}
  </div>  
)

Blog.propTypes = {
  blog: PropTypes.array
}

export default Blog