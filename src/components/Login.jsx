import React from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .required(t('errors.required')),
    password: Yup.string()
      .required(t('errors.required')),
  });

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={async (values, { setErrors }) => {
        try {
          const { data: { token, username } } = await axios.post('/api/v1/login', values);
          localStorage.setItem('token', token);
          localStorage.setItem('username', username);
          navigate('/');
        } catch (e) {
          setErrors({
            username: '',
            password: t('errors.logIn'),
          });
        }
      }}
      validationSchema={loginSchema}
    >
      {({ isSubmitting, errors }) => {
        const userNameClasses = classNames('form-control', {
          'is-invalid': _.has(errors, 'username'),
        });
        const passwordClasses = classNames('form-control', {
          'is-invalid': _.has(errors, 'password'),
        });
        return (
          <div className="container mt-4">
            <div className="row justify-content-md-center">
              <h3>{t('signIn')}</h3>
            </div>
            <div className="row justify-content-md-center">
              <Form className="needs-validation col-md-4">
                <div className="form-group">
                  <Field id="username" type="text" name="username" className={userNameClasses} placeholder={t('userNike')} required />
                  <label className="sr-only" htmlFor="username">{t('userNike')}</label>
                  <ErrorMessage name="username" component="div" className="invalid-feedback" htmlFor="username" />
                </div>
                <div className="form-group">
                  <Field id="password" type="password" name="password" className={passwordClasses} placeholder={t('password')} required />
                  <label className="sr-only" htmlFor="password">{t('password')}</label>
                  <ErrorMessage name="password" component="div" className="invalid-feedback" htmlFor="password" />
                </div>
                <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                  {t('buttons.logIn')}
                </button>
              </Form>
            </div>
            <div className="text-center mt-3">
              {`${t('notAccount')} `}
              <Link to="/signup">{t('signUp')}</Link>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default Login;
