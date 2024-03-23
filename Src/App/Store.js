import { configureStore } from '@reduxjs/toolkit'
import { tokenSlice } from '../Features/Token'
import authSlice from '../Features/authSlice'
export const store = configureStore({
  reducer: {
    token:tokenSlice,
Auth:authSlice
  },
  
})



