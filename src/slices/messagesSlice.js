/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice.js';

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
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, { payload }) => {
      state.value = state.value.filter((message) => message.channelId !== payload.id);
    });
  },
});

export const { loadMessages, addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
