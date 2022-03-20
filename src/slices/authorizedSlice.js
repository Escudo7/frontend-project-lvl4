import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: localStorage.getItem('chat-token') !== null,
};

const authorizedSlice = createSlice({
  name: 'authorized',
  initialState,
  reducers: {
    logIn: (state) => {
      state.value = true;
    },
    logOut: (state) => {
      state.value = false;
    },
  },
});

export const { logIn, logOut } = authorizedSlice.actions;

export default authorizedSlice.reducer;