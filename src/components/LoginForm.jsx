import { useState } from "react";
import PropTypes from 'prop-types'

import loginService from '../services/login'
import blogService from '../services/blogs' 

import Togglable from "./Togglable";

const LoginForm = ({ setUser, handleMessage }) => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      if (user) {
        setUser(user)
        blogService.setToken(user.token)
        window.localStorage.setItem(
          'loggedNoteappUser', JSON.stringify(user)
        ) 
      }
      
      setUsername('')
      setPassword('')
    // eslint-disable-next-line no-unused-vars
    } catch (exception) {
      handleMessage('Wrong credentials', false)
    }
  }
    
  return (
    <Togglable buttonLabel="login">
      <form onSubmit={handleLogin}>
        <div>
          username:{' '}
            <input
            type="text"
            value={username}
            data-testid='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:{' '}
            <input
            type="password"
            value={password}
            data-testid='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </Togglable>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  handleMessage: PropTypes.func.isRequired
}

export default LoginForm;