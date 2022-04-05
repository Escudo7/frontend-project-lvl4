import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthorized(token !== null);
  });

  const onClickHandler = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
      <div className="container-fluid ml-3">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        {isAuthorized && (
          <button type="button" className="btn btn-primary mr-3" onClick={onClickHandler}>
            {t('buttons.logOut')}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
