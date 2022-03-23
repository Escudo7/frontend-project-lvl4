import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../slices/authorizedSlice.js';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthorized = useSelector((state) => state.authorized.value);

  const onClickHandler = () => {
    localStorage.removeItem('chat-token');
    dispatch(logOut());
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container-fluid ml-3">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        {isAuthorized && (
          <button type="button" className="btn btn-primary mr-3" onClick={onClickHandler}>
            Выйти
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
