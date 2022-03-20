import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login.jsx';
import NoMatch from './NoMatch.jsx';
import Main from './Main.jsx';
import Header from './Header.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
