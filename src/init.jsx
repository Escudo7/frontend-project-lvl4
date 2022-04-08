// @ts-check
import React from 'react';
import { io } from 'socket.io-client';
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import 'react-toastify/dist/ReactToastify.css';
import App from './components/App.jsx';

export default (socket = io()) => (
  <App socket={socket} />
);
