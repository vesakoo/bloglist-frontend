import {createSlice} from '@reduxjs/toolkit'

const initialState =  {notification: ''  }

const notificationSlice =createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    setReduxNotification(state,action){
      console.log('dispatching:', state,action)
      state.notification= action.payload
    }
  }

})

export const {
  setReduxNotification
} = notificationSlice.actions


export default notificationSlice.reducer

