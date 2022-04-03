import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import Login from './Login.jsx';
import NoMatch from './NoMatch.jsx';
import Main from './chat/Main.jsx';
import Header from './Header.jsx';
import SignUp from './SignUp.jsx';
import { addMessage } from '../slices/messagesSlice.js';
import { addChannel, renameChannel, removeChannel } from '../slices/channelsSlice.js';

const App = () => {
  const dispatch = useDispatch();

  const socket = io();

  socket.on('newMessage', (message) => {
    dispatch(addMessage(message));

    const messagesBlock = document.querySelectorAll('#messages-box div');
    const messagesLength = messagesBlock.length;

    if (messagesLength > 0) {
      const lastMessageBlock = messagesBlock[messagesLength - 1];
      lastMessageBlock.scrollIntoView();
    }
  });

  socket.on('newChannel', (channel) => {
    dispatch(addChannel(channel));
  });

  socket.on('renameChannel', (channel) => {
    dispatch(renameChannel(channel));
  });

  socket.on('removeChannel', (data) => {
    dispatch(removeChannel(data));
  });

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main socket={socket} />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
