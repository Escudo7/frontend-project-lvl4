import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import { Provider, ErrorBoundary } from '@rollbar/react';
import Login from './Login.jsx';
import NoMatch from './NoMatch.jsx';
import Main from './chat/Main.jsx';
import Header from './Header.jsx';
import SignUp from './SignUp.jsx';
import { addMessage } from '../slices/messagesSlice.js';
import { addChannel, renameChannel, removeChannel } from '../slices/channelsSlice.js';
import resources from '../lng/index.js';
import rollbarConfig from '../../rollbar.config.js';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

const App = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
    toast.success(t('messages.addChannel'));
  });

  socket.on('renameChannel', (channel) => {
    dispatch(renameChannel(channel));
    toast.success(t('messages.renameChannel'));
  });

  socket.on('removeChannel', (data) => {
    dispatch(removeChannel(data));
    toast.success(t('messages.removeChannel'));
  });

  socket.on('connect_error', () => {
    toast.error(t('messages. connectionError'));
  });

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <BrowserRouter>
          <ToastContainer />
          <Header />
          <Routes>
            <Route path="/" element={<Main socket={socket} />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
