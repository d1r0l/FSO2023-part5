/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
const Blog = ({blog}) => (
  <div>
    {blog.title} by {blog.author}
  </div>  
)

export default Blog