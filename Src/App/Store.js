import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from '../Features/Token'
import AuthReducer from '../Features/authSlice'
export const store = configureStore({
  reducer: {
    token:tokenReducer,
Auth:AuthReducer
  },
  
})



