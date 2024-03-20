// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dashboard.syedasif.me/' }),
  endpoints: (builder) => ({


    Register: builder.mutation({
      
        query: (body) => {
       
          return{
          url: 'api/register',
          method: 'POST',
          headers: {
             Accept: 'application/json',
    'Content-Type': 'application/json',

        },
          body,
          responseHandler: (response) => response.json(),
      }
        },
      }),

      getProfile: builder.query({
        query: (token) => {
          // Log the value of Token
          console.log('token', token);
          return {
            url: '/get-user-profile',
            method: 'GET',
            headers: {
              'Accept': ' */*',
 
              'Authorization': `Bearer ${token}`,
            },
            responseHandler: (response) => response.json(),
          };
        },
      }),
      
      getuser: builder.query({
        query: (token) => {
          // Log the value of Token
          console.log('token', token);
          return {
            url: '/api/user/getall',
            method: 'GET',
            headers: {
              'Accept': ' */*',
 
              'Authorization': `Bearer ${token}`,
            },
            responseHandler: (response) => response.json(),
          };
        },
      }),
      Login: builder.mutation({
        query: (values) => {
        
         // Log the value of Token
          console.log('values',values)
          return {
            url: 'api/login',
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
              'Content-Type': 'application/json',
         
            },
            body:values,
            responseHandler: (response) => response.json(),
            validateStatus: (response, result) => response.status === 200 && !result.isError
          };
        },
      }),
      

  

  }),


})


export const { useRegisterMutation,useGetuserQuery,useLoginMutation} = AuthApi