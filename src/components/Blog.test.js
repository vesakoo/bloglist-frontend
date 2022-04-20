import React from "react";
import '@testing-library/jest-dom/extend-expect'
import {render,screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import Togglable from './Togglable'

describe('<Blog />', () => {
  let container
  const blog ={
    title: 'Blog title',
    author: 'Blog Author',
    likes: 5,
    url: 'http://blog_url',
    user: {
      username: 'blog user username',
      name: 'blog user name',
      id: 'absdefg'
    }
  }
  const modifyBlog =jest.fn()
  const deleteBlog =jest.fn()
  beforeEach(()=>{
    container = render(
      <Blog blog={blog} 
            currentUser={blog.user}
            modifyBlog={modifyBlog}
            deleteBlog={deleteBlog} 
      />
    ).container
  })

  test('render blog title and hide details', () => {
    const hiddenDiv = container.querySelector('.togglableContent')
    //screen.debug()
    expect(hiddenDiv).toHaveStyle('display: none')

    const visibleDiv =container.querySelector('.blogTitleRow')
    expect(visibleDiv).toHaveTextContent(/Title: Blog title/)
    expect(visibleDiv).toHaveTextContent(/Author: Blog Author/)
    //geByText(`Title: ${blog.title} Author: ${blog.author}`)

  })

  test('render url and likes after More button click', () =>{
    const moreButton=screen.getByText('More')
    userEvent.click(moreButton)
    //screen.debug()
    const hiddenDiv = container.querySelector('.togglableContent')
    expect(hiddenDiv).not.toHaveStyle('display: none')


  })

  test('that likes are executed twice when pressed twice', ()=>{
    const moreButton=screen.getByText('More')
    userEvent.click(moreButton)
    const likesBtn =screen.getByText('Like')
    userEvent.click(likesBtn)
    userEvent.click(likesBtn)
    expect(modifyBlog.mock.calls).toHaveLength(2) 

  })

})