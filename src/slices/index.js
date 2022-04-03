import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import messagesSliceReducer from './messagesSlice.js';
import modalReducer from './modalSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesSliceReducer,
    modal: modalReducer,
  },
});
