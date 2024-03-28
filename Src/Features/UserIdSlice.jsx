import { createSlice, PayloadAction } from '@reduxjs/toolkit';



const initialState = {
  UserId: null,
};

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    Setuserid: (state, action) => {
        console.log('payload ',action.payload)
      state.UserId = action.payload;
    },
    unsetUserId: (state) => {
      state.UserId = null;
    },
  },
});

export const { Setuserid, unsetUserId } = UserSlice.actions;

export default UserSlice.reducer;
