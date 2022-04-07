// @ts-check
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './slices/index.js';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import 'react-toastify/dist/ReactToastify.css';
import App from './components/App.jsx';

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);

