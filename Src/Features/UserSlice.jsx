import { createSlice, PayloadAction } from '@reduxjs/toolkit';



const initialState = {
  Id: null,
};

export const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    Setid: (state, action) => {
        console.log('payload ',action.payload)
      state.Id = action.payload;
    },
    unsetUserId: (state) => {
      state.Id = null;
    },
  },
});

export const { Setid, unsetUserId } = UserSlice.actions;

export default UserSlice.reducer;
