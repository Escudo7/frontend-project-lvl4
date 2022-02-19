import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login.jsx';
import NoMatch from './NoMatch.jsx';

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NoMatch />} />
        </Routes>
    </BrowserRouter>
);

export default App;