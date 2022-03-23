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
    setActiveChannelId: (state, { payload }) => {
      state.value.activeChannelId = payload;
    },
  },
});

export const { loadChannels, setActiveChannelId } = channelsSlice.actions;

export default channelsSlice.reducer;
