import { createSlice, PayloadAction } from '@reduxjs/toolkit';



const initialState = {
  token: null,
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload.token;
    },
    unsetUserToken: (state) => {
      state.token = null;
    },
  },
});

export const { setUserToken, unsetUserToken } = tokenSlice.actions;

export default tokenSlice.reducer;
