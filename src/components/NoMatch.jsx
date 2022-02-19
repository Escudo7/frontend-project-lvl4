import React from 'react';

const NoMatch = () => (
    <div className="row justify-content-md-center">
        <div className="card">
            <img className="card-img-top" src={require('/assets/error-404.png').default} alt="404" />
            <div className="card-body text-center">
                <h5 className="card-title">Страница не найдена</h5>
                <p className="card-text">
                    Но вы можете перейти на <a href="/">главную страницу</a>
                </p>
            </div>
        </div>
    </div>
);

export default NoMatch;