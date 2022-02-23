import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('chat-token');

    if (token === null) {
      navigate('/login');
    }
  });

  return <div>Chat</div>;
};

export default Main;
