import React from 'react';
import { useTranslation } from 'react-i18next';
import notFound from '../../assets/error-404.png';

const NoMatch = () => {
  const { t } = useTranslation();

  return (
    <div className="row justify-content-md-center">
      <div className="card border-0">
        <img className="card-img-top" src={notFound} alt="404" />
        <div className="card-body text-center">
          <h5 className="card-title">{t('notFound.pageNotFound')}</h5>
          <p className="card-text">
            <span>{t('notFound.mayRedirect')}</span>
            <a href="/">{t('notFound.mainPage')}</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoMatch;
