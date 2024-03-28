import { configureStore } from '@reduxjs/toolkit'
import { tokenSlice } from '../Features/Token'
import authSlice from '../Features/authSlice'
import { UserSlice } from '../Features/UserIdSlice'
export const store = configureStore({
  reducer: {
    token:tokenSlice,
Auth:authSlice,
User:UserSlice
  },
  
})



