import { configureStore } from '@reduxjs/toolkit';
import authorizedReducer from './authorizedSlice.js';

export default configureStore({
  reducer: {
    authorized: authorizedReducer,
  },
});