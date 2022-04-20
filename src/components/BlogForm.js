import { useState } from "react"
import PropTypes from 'prop-types'
const BlogForm = (props) =>{
 
 const [addTitle,setAddTitle] =useState('')
 const [addAuthor,setAddAuthor]=useState('')
 const [addUrl,setAddUrl]=useState('')
 //const [newBlog,setNewBlog]=useState({title:'',author:'',url:''})

const handleCreateBlog = (event) =>{
  event.preventDefault()
  const newBlog ={
    title: addTitle,
    author: addAuthor,
    url: addUrl
  }
  props.createBlog(newBlog)
  setAddAuthor('')
  setAddTitle('')
  setAddUrl('')
  //setNewBlog({title:'',author:'',url:''})
}
/*
const handleChange =(event)=> {
  const newBlog ={
    title: addTitle,
    author: addAuthor,
    url: addUrl
  }
}*/



 return(
<div>
  <h2>Create new</h2>
  <form  onSubmit={handleCreateBlog}>
    <div>
      title:
      <input type='text' id='blogTitle' name ="title" value={addTitle} placeholder='Blog title'
      onChange={ ({target}) => setAddTitle(target.value) } />
    </div>
    <div>
      author:
      <input type='text' id='blogAuthor' name="author" value={addAuthor} placeholder='Author name'
      onChange={ ({target}) => setAddAuthor(target.value) }/>
    </div>
    <div>
      url:
      <input type='text' id='blogUrl' name="url" value={addUrl} placeholder='https://acme.org'
      onChange={ ({target}) => setAddUrl(target.value) }/>
    </div>
    <button type='submit'>create</button>
  </form>
  
</div>)  
 }

 BlogForm.propTypes = {
   createBlog: PropTypes.func
 }

export default BlogForm
