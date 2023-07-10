import PropTypes from 'prop-types'

const BlogForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url
}) => {
  return (
    <form onSubmit={handleSubmit}>
      title:
      <input
        type='text'
        name='title'
        value={title}
        onChange={handleTitleChange}
      />
      <br/>
      author:
      <input
        type='text'
        name='author'
        value={author}
        onChange={handleAuthorChange}
      />
      <br/>
      url:
      <input
        type='text'
        name='url'
        value={url}
        onChange={handleUrlChange}
      />
      <br/>
      <button type='submit'>create</button>
    </form>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default BlogForm
