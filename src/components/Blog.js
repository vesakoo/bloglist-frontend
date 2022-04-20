//import { useState } from "react"
//import blogs from "../services/blogs"
import Togglable from "./Togglable"
import PropTypes from 'prop-types'


const Blog = ({blog,modifyBlog,deleteBlog,currentUser}) =>{

 //const [myVisibility,setMyVisibility]=useState('false')
 //const toggleListener = useRef()



  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikes =(event) =>{    
    modifyBlog(blog.id)
  }
  const handleDelete =(event) =>{ 
    if(window.confirm('Delete Blog enrty?')){
      deleteBlog(blog.id)
    }
  } 

  const delButton =()=>{

  }

  return (
  <div style={blogStyle}>
    <div className='blogTitleRow'>Title: {blog.title} Author: {blog.author}</div>
    <Togglable key={`togg_${blog.id}`} buttonLabel='More' buttonLabel2='Hide' visible={blog.visible?blog.visible:false} >
    <div>{blog.url}</div>
    <div>Likes: {blog.likes} <button onClick={handleLikes}>Like</button></div>
    <div>owner: {blog.user?blog.user.username:'null'}</div>
    {currentUser.user ===blog.user.username?
    <div><button onClick={handleDelete}>Delete</button></div>
    :''}
    </Togglable>
  </div>  
)
}

Blog.propTypes = {
  blog: PropTypes.object,
  modifyBlog: PropTypes.func,
  deleteBlog: PropTypes.func,
  currentUser: PropTypes.object
}

export default Blog