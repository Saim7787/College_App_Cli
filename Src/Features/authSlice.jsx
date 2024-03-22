import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api_Url } from "../Utility/ApiUrl";
import Toast from "react-native-toast-message";
//API URL



// User LOGIN
export const loginuserAsync = createAsyncThunk(
  "user/login",
  async (formdata) => {
    try {
      const response = await axios.post(`${Api_Url}/users/login`, formdata);

     
      Toast.show({
        type: 'success',
        text1: response?.data?.message
      });
      return response.data;
    } catch (error) {
      console.log('error status',error.response.status)
      Toast.show({
        type: 'error',
        text1: error.response.data.message
      });
      return error.response.status
    }
  }
);

// User LOGOUT
export const logoutUserAsync = createAsyncThunk("users/logout", async () => {
  await axios.delete(`${Api_Url}/users/logout`);
});

/* USER Signup */
export const UserSignupAsync = createAsyncThunk(
  "clients/signup",
  async (data) => {
    try {
      const response = await axios.post(`${Api_Url}/users/signUp`, data);

    
      Toast.show({
        type: 'success',
        text1: response?.data?.message
      });
      return response.data;
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error.response.data.message
      });
    }
  }
);


// Get Admin

export const GetAdmin = createAsyncThunk(
  "clients/getAdmins",
  async (data) => {
    try {
      const response = await axios.post(`${Api_Url}/users/getAdmins`, data);
      Toast.show({
        type: 'success',
        text1: response?.data?.message
      });
    
      return response.data;
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error.response.data.message
      });
    }
  }
);

// Update User
export const UpdateUser = createAsyncThunk(
  "clients/getAdmins",
  async (data) => {
    try {
      const response = await axios.post(`${Api_Url}/users/updateUser`, data);
      Toast.show({
        type: 'success',
        text1: response?.data?.message
      });
    
      return response.data;
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error.response.data.message
      });
    }
  }
);


// AUTH USER ASYNC THUNK
export const authUserAsync = createAsyncThunk("client/authClientSessionEverytime", async () => {
  try {
    const response = await axios.post(`${Api_Url}/users/getActiveSessions`);
    return response.data;
  } catch (error) {
    console.log(error.response.data.msg);
  }
});

// INITIAL STATE
const initialState = {
  User: null,
  CreateUser: null,
  Admin:null,
  loading: false,
  logoutUser: null,
  clearUser: null,
  token: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    RemoveUserData: (state) => {
      state.User = null;
    },
    addUserData: (state, action) => {
      state.User = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // USER LOGIN
      .addCase(loginuserAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginuserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.User = action.payload;
      })

      // SIGN UP ADD CASE
      .addCase(UserSignupAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(UserSignupAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.CreateUser = action.payload;
      })


      .addCase(GetAdmin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(GetAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.Admin = action.payload;
      })
      //  Send Otp

      .addCase(authUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(authUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.User = action.payload;
      });
  },
});

export const { RemoveUserData, addUserData } = authSlice.actions;

export default authSlice.reducer;