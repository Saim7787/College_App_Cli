import { configureStore } from '@reduxjs/toolkit'
import { tokenSlice } from '../Features/Token'
import authSlice from '../Features/authSlice'
import userReducer from '../Features/UserSlice' 
export const store = configureStore({
  reducer: {
    token:tokenSlice,
Auth:authSlice,
User:userReducer
  },
  
})



