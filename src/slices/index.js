import { configureStore } from '@reduxjs/toolkit';
import authorizedReducer from './authorizedSlice.js';
import channelsReducer from './channalsSlice.js';
import messagesSliceReducer from './messagesSlice.js';

export default configureStore({
  reducer: {
    authorized: authorizedReducer,
    channels: channelsReducer,
    messages: messagesSliceReducer,
  },
});
