import { configureStore } from '@reduxjs/toolkit'
import { AuthApi } from '../Service/Auth'
import tokenReducer from '../Features/Token'
export const store = configureStore({
  reducer: {
    token:tokenReducer,
[AuthApi.reducerPath] : AuthApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(AuthApi.middleware),
})



