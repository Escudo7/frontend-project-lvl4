import React from 'react';
import notFound from '../../assets/error-404.png';

const NoMatch = () => (
  <div className="row justify-content-md-center">
    <div className="card">
      <img className="card-img-top" src={notFound} alt="404" />
      <div className="card-body text-center">
        <h5 className="card-title">Страница не найдена</h5>
        <p className="card-text">
          <span>Но вы можете перейти на </span>
          <a href="/">главную страницу</a>
        </p>
      </div>
    </div>
  </div>
);

export default NoMatch;
