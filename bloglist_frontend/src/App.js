import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)
  const [ title, setTitle ] = useState('')
  const [ author, setAuthor ] = useState('')
  const [ url, setUrl ] = useState('')
  const [ notifyColor, setNotifyColor ] = useState('green')
  const [ notifyText, setNotifyText ] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    const blogsLoader = async () => {
      const response = await blogService.getAll()
      setBlogs(response)
    }
    blogsLoader()
  }, [])

  useEffect(() => {
    const storedUser = window.localStorage.getItem('loggedBloglistAppUser')
    if (storedUser) {
      const loadedUser = JSON.parse(storedUser)
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
      setNotification('login successful', 'green')
    } else {
      setNotification('wrong credentials', 'red')
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBloglistAppUser')
    setNotification('logged out', 'green')
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
      blogFormRef.current.toggleVisibility()
      setBlogs(updatedBlogs)
      setNotification(`a new blog "${savedBlog.title}" by "${savedBlog.author}" added`, 'green')
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      console.log(error)
      if (error.response.data.error) {
        setNotification(error.response.data.error, 'red')
      } else {
        setNotification('an error occured', 'red')
      }
    }
  }

  const setNotification = (text, color) => {
    setNotifyText(text)
    setNotifyColor(color)
    setTimeout(() => setNotifyText(''), 2500)
  }

  const blogList = () => {
    return(
      <div>
        <p>
          {user.name} logged in&nbsp;
          <button type='button' onClick={handleLogout}>
            logout
          </button>
        </p>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm
            handleSubmit={handleCreateNewBlog}
            handleTitleChange={({target}) => setTitle(target.value)}
            handleAuthorChange={({target}) => setAuthor(target.value)}
            handleUrlChange={({target}) => setUrl(target.value)}
            title={title}
            author={author}
            url={url}
          />
        </Togglable>
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
      <h2>Blogs</h2>
      <Notification text={notifyText} color={notifyColor}/>
      {user
        ? blogList()
        : <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={({target}) => setUsername(target.value)}
          handlePasswordChange={({target}) => setPassword(target.value)}
          username={username}
          password={password}
        />
      }
    </div>
  )
}

export default App
