/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    channels: [],
    activeChannelId: null,
  },
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    loadChannels: (state, { payload }) => {
      state.value.channels = [...payload];
    },
    addChannel: (state, { payload }) => {
      state.value.channels = [...state.value.channels, payload];
    },
    renameChannel: (state, { payload }) => {
      const foundedChannel = state.value.channels.find((channel) => channel.id === payload.id);

      if (foundedChannel) {
        foundedChannel.name = payload.name;
      }
    },
    removeChannel: (state, { payload }) => {
      state.value.channels = state.value.channels.filter((channel) => channel.id !== payload.id);
      state.value.activeChannelId = state.value.channels?.[0]?.id ?? null;
    },
    setActiveChannelId: (state, { payload }) => {
      state.value.activeChannelId = payload;
    },
  },
});

export const {
  loadChannels,
  addChannel,
  renameChannel,
  removeChannel,
  setActiveChannelId,
} = channelsSlice.actions;

export default channelsSlice.reducer;
