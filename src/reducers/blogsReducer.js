import {createSlice} from '@reduxjs/toolkit'
import {getAll,addBlog,modifyBlog} from '../services/blogs'
import blogService from '../services/blogs'

const initialState =  []

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: initialState,
  reducers: {
    setBlogs(state,action){
      return action.payload
    },
    appendBlog(state,action){
      state.push(action.payload)
    }
  }

})
export const{
  setBlogs,
  appendBlog
}=blogsSlice.actions


export const initialiseBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
  
    dispatch(setBlogs(blogs))
  }  
}

export default blogsSlice.reducer

