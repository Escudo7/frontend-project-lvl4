import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar, Container } from 'react-bootstrap';

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
    <Navbar bg="light" expand="lg" className="bg-white shadow-sm align-items-center">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
        {isAuthorized && (
          <button type="button" className="btn btn-primary mr-3" onClick={onClickHandler}>
            {t('buttons.logOut')}
          </button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
