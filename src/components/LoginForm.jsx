import { useState } from "react";
import loginService from '../services/login'
import blogService from '../services/blogs'  

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
    <form onSubmit={handleLogin}>
      <div>
        username:{' '}
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:{' '}
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm;