import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Footer from './components/Footer'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import styled from 'styled-components'
import ReactDOM from 'react-dom'

import { useDispatch,useSelector } from "react-redux"
import {  setReduxNotification } from './reducers/notificationReducer'
import { initialiseBlogs } from './reducers/blogsReducer'

const App = () => {
  //const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')
  const [likedId, setLikedId] = useState('')

  const toggleListener = useRef()

  const dispatch = useDispatch()


  useEffect(() =>{
    dispatch(initialiseBlogs())
},[dispatch])
/*
  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])
*/
  const blogs = useSelector(state =>state.blogs )

  useEffect(() => {
    const loggedInUserJson = window.localStorage.getItem('loggedInBlogappUser')
    if (loggedInUserJson) {
      const user = JSON.parse(loggedInUserJson)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedInBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification('Login succesfull')
    } catch (error) {
      console.error('login error', error)
      setNotification(`login error: ${notification}`)
    }
  }

  const handleLogout = async () => {
    console.log('logging out user')
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedInBlogappUser')
    setNotification('User logged out')
  }

  const createBlog = async (blog) => {
    console.log('new blog post')
    //const createBlog =blog
    try {
      const savedBlog = await blogService.addBlog(blog)
      console.log('uusi blogi', savedBlog)
      /////////////setNotification('new Blog created')
      dispatch( setReduxNotification('new Blog created'))
      const temppi = await blogService.getAll()
      ////////setBlogs(temppi)
      toggleListener.current.toggle()
    } catch (error) {
      console.log('error when creating blog')
      /////////setNotification(`error when creating blog ${error}`)
      dispatch( setReduxNotification(`error when creating blog ${error}`))
    }
  }

  const modifyBlog = async (id) => {
    const blog = blogs.find((n) => n.id === id)
    const changedblog = { ...blog, likes: blog.likes + 1 }
    const response = await blogService.modifyBlog(changedblog)
    console.log('likes entry', response)
    //response.visible=true
    ////////setBlogs(blogs.map((blog) => (blog.id !== id ? blog : response)))
    console.log('blogit on', blogs)
    //ReactDOM.render(super,document.getElementById('root'))
  }

  const deleteBlog = async (id) => {
    try {
      const blog = blogs.find((n) => n.id === id)
      const response = await blogService.deleteBlog(blog)
      //////////setBlogs(blogs.filter((blog) => blog.id !== id))
      console.log('wastine:', response)
    } catch (error) {
      console.error('error', error)
    }
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    )
  }

  const logOut = () => {
    return (
      <div>
        <button onClick={() => handleLogout()}>Logout</button>
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <Notification message={notification} />
        <h2>Login user</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <Notification  />
      <div id='userData'>
        {user.name} logged in {logOut()}
      </div>
      <Togglable buttonLabel='new Blog' ref={toggleListener}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <h2>blogs</h2>
      <div>
        <p>{user.name} logged in</p>
      </div>

      {blogs.map((blog) => (
        <div key={blog.id}>
          <Blog
            key={blog.id}
            blog={blog}
            modifyBlog={modifyBlog}
            deleteBlog={deleteBlog}
            currentUser={user}
          />{' '}
        </div>
      ))}
      <Footer />
    </div>
  )
}

export default App
