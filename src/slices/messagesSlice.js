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
    addMessage: (state, { payload }) => {
      state.value = [...state.value, payload];
    },
  },
});

export const { loadMessages, addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
