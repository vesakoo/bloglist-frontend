import React from 'react';
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

import {Provider} from 'react-redux'
import notificationReducer from './reducers/notificationReducer';
import blogsReducer from './reducers/blogsReducer';
import {configureStore} from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer
  }
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'))