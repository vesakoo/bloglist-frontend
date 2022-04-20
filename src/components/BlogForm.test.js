import React from "react";
import '@testing-library/jest-dom/extend-expect'
import {render,screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from "./BlogForm"

test('<BlogForm /> ensure call with right parameters', ()=>{
  const createBlog = jest.fn()
  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('Blog title')
  const authorInput =screen.getByPlaceholderText('Author name')
  const urlInput =screen.getByPlaceholderText('https://acme.org')

  userEvent.type(titleInput,'my test title')
  userEvent.type(authorInput,'my test author name')
  userEvent.type(urlInput,'https://testurl.fi')
  const sendButton= screen.getByText('create')
  userEvent.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  console.log('mocci',createBlog.mock.calls[0][0])
  expect(createBlog.mock.calls[0][0].title).toBe('my test title')
  expect(createBlog.mock.calls[0][0].author).toBe('my test author name')
  expect(createBlog.mock.calls[0][0].url).toBe('https://testurl.fi')


})