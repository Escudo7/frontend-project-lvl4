import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import Socket from './Socket.jsx';
import Login from './Login.jsx';
import NoMatch from './NoMatch.jsx';
import Main from './chat/Main.jsx';
import Header from './Header.jsx';
import SignUp from './SignUp.jsx';
import resources from '../lng/index.js';
import rollbarConfig from '../../rollbar.config.js';
import store from '../slices/index.js';

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

const App = ({ socket }) => (
  <BrowserRouter>
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <Socket socket={socket}>
            <ToastContainer />
            <Header />
            <Routes>
              <Route path="/" element={<Main socket={socket} />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </Socket>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  </BrowserRouter>
);

export default App;
