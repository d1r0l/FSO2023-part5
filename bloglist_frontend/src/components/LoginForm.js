import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const credentials = {
      username: username,
      password: password
    }
    setPassword('')
    setUsername('')
    handleLogin(credentials)
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleSubmit}>
        username
        <input
          type='text'
          name='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <br />
        password
        <input
          type='text'
          name='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm
