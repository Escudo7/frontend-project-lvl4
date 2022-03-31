import { configureStore } from '@reduxjs/toolkit';
import authorizedReducer from './authorizedSlice.js';
import channelsReducer from './channelsSlice.js';
import messagesSliceReducer from './messagesSlice.js';
import modalReducer from './modalSlice.js';

export default configureStore({
  reducer: {
    authorized: authorizedReducer,
    channels: channelsReducer,
    messages: messagesSliceReducer,
    modal: modalReducer,
  },
});
