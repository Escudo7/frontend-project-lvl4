import React from 'react';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
} from 'formik';
import axios from 'axios';
import classNames from 'classnames';
import _ from 'lodash';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SignUp = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const signUpSchema = Yup.object().shape({
    username: Yup.string()
      .required(t('errors.required'))
      .min(3, t('errors.userNameLength'))
      .max(20, t('errors.userNameLength')),
    password: Yup.string()
      .required(t('errors.required'))
      .min(6, t('errors.password')),
    confirmPassword: Yup.string()
      .required(t('errors.required'))
      .oneOf([Yup.ref('password')], t('errors.passwordConfirmation')),
  });

  return (
    <Formik
      initialValues={{ username: '', password: '', confirmPassword: '' }}
      onSubmit={async (values, { setErrors }) => {
        try {
          const { data: { token, username } } = await axios.post('/api/v1/signup', values);
          localStorage.setItem('token', token);
          localStorage.setItem('username', username);
          navigate('/');
        } catch (e) {
          setErrors({
            username: t('errors.userNameExists'),
            password: '',
          });
        }
      }}
      validationSchema={signUpSchema}
    >
      {({ isSubmitting, errors }) => {
        const userNameClasses = classNames('form-control', {
          'is-invalid': _.has(errors, 'username'),
        });
        const passwordClasses = classNames('form-control', {
          'is-invalid': _.has(errors, 'password'),
        });
        const confirmPasswordClasses = classNames('form-control', {
          'is-invalid': _.has(errors, 'confirmPassword'),
        });

        return (
          <div className="container  mt-4">
            <div className="row justify-content-md-center">
              <h3>{t('signUp')}</h3>
            </div>
            <div className="row justify-content-md-center">
              <Form className="needs-validation col-md-4">
                <div className="form-group">
                  <Field id="username" type="text" name="username" className={userNameClasses} placeholder={t('userName')} required />
                  <label className="sr-only" htmlFor="username">{t('userName')}</label>
                  <ErrorMessage name="username" component="div" className="invalid-feedback" htmlFor="username" />
                </div>
                <div className="form-group">
                  <Field id="password" type="password" name="password" className={passwordClasses} placeholder={t('password')} required />
                  <label className="sr-only" htmlFor="password">{t('password')}</label>
                  <ErrorMessage name="password" component="div" className="invalid-feedback" htmlFor="password" />
                </div>
                <div className="form-group">
                  <Field id="confirmPassword" type="password" name="confirmPassword" className={confirmPasswordClasses} placeholder={t('passwordConfirmation')} required />
                  <label className="sr-only" htmlFor="confirmPassword">{t('passwordConfirmation')}</label>
                  <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" htmlFor="confirmPassword" />
                </div>
                <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                  {t('buttons.singUp')}
                </button>
              </Form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default SignUp;
