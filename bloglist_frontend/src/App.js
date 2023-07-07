/* eslint-disable no-constant-condition */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')


  useEffect(() => {
    const blogsLoader = async() => {
      const response = await blogService.getAll()
      setBlogs(response)
    }
    blogsLoader()
  }, [])

  useEffect(() => {
    const loadedUser = JSON.parse(window.localStorage.getItem('loggedBloglistAppUser'))
    if (loadedUser) {
      setUser(loadedUser)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    const credentials = {
      username: username,
      password: password
    }
    const loggedUser = await loginService(credentials)
    if (loggedUser) {
      window.localStorage.setItem('loggedBloglistAppUser', JSON.stringify(loggedUser))
      setUser(loggedUser)
      setPassword('')
      setUsername('')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBloglistAppUser')
  }

  const handleCreateNewBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    try {
      const savedBlog = await blogService.createNew(newBlog, user.token)
      const updatedBlogs = blogs.concat(savedBlog)
      setBlogs(updatedBlogs)
    } catch (error) {
      console.log(error)
    }
  }

  const loginForm = () => {
    return(
      <div>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          username
          <input
            type='text'
            name='username'
            value={username}
            onChange={({target}) => setUsername(target.value)}
          />
          <br/>
          password
          <input
            type='text'
            name='password'
            value={password}
            onChange={({target}) => setPassword(target.value)}
          />
          <br/>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  const blogAddForm = () => {
    return (
      <form onSubmit={handleCreateNewBlog}>
        title:
        <input
          type='text'
          name='title'
          value={title}
          onChange={({target}) => setTitle(target.value)}
        />
        <br/>
        author:
        <input
          type='text'
          name='author'
          value={author}
          onChange={({target}) => setAuthor(target.value)}
        />
        <br/>
        url:
        <input
          type='text'
          name='url'
          value={url}
          onChange={({target}) => setUrl(target.value)}
        />
        <br/>
        <button type='submit'>create</button>
      </form>
    )
  }

  const blogList = () => {
    return(
      <div>
        <h2>blogs</h2>
        <p>
          {user.name} logged in
          <button type='button' onClick={handleLogout}>
            logout
          </button>
        </p>
        {blogAddForm()}
        <br/>
        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      {user
        ? blogList()
        : loginForm()
      }
    </div>
  )
}

export default App