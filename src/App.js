import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
  // useEffect(() => {
  //   if(user !== null) {
  //     setUser(user)
  //     blogService.setToken(user.token)
  //   }
  // }, [])

  const loginForm = () => (
    <div>
      <h2>Log into the application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
          
  )

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      // window.localStorage.setItem(
      //   'loggedNoteappUser', JSON.stringify(user)
      // )
      blogService.setToken(user.token)
      console.log("token", user.token)
      const blogs = await blogService.getAll()
      console.log(blogs) 
      setBlogs(blogs)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      //setErrorMessage('Wrong credentials')
      // setTimeout(() => {
      //   setErrorMessage(null)
      // }, 5000)
      console.log(exception)
    }
    console.log('logging in with', username, password)
  }

  if (user === null) {
    return (
      loginForm()
    )
  }

  return (
    <div>
      
      <h2>blogs</h2>
      <p>{user.name} is logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App