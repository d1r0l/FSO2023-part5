import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleCreateBlog }) => {
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    handleCreateBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      title:
      <input
        type='text'
        name='title'
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      <br/>
      author:
      <input
        type='text'
        name='author'
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      />
      <br/>
      url:
      <input
        type='text'
        name='url'
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      />
      <br/>
      <button type='submit'>create</button>
    </form>
  )
}

BlogForm.propTypes = {
  handleCreateBlog: PropTypes.func.isRequired
}

export default BlogForm
