import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    loadMessages: (state, { payload }) => {
      state.value = payload;
    },
  },
});

export const { loadMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
