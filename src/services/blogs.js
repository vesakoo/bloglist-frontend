import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken =>{
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const addBlog = async (blog)=>{
  const config = {
    headers: {Authorization: token}
  }
  const response=await axios.post(baseUrl,blog,config)
  return response.data
}

const modifyBlog = async (blog)  => {
  try{
    const config = { headers: {Authorization: token} }
    const request = await axios.put(`${baseUrl}/${blog.id}`, blog,config)
    return request.data
  }catch(error){
    console.error('blogposterror when modify',error)
  }

}
const deleteBlog = async (blog) => {
  const config = { headers: {Authorization: token} }
   await axios.delete(`${baseUrl}/${blog.id}`,config)

}

export default { getAll,setToken,addBlog,modifyBlog,deleteBlog }