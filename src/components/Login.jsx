import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';
import _ from 'lodash';

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Обязательное поле'),
  password: Yup.string()
    .required('Обязятельное поле'),
});

const Login = () => {
  const navigate = useNavigate();

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
            password: 'Неверные имя пользователя или пароль',
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
          <div className="container">
            <div className="row justify-content-md-center">
              <h3>Вход</h3>
            </div>
            <div className="row justify-content-md-center">
              <Form className="needs-validation col-md-4">
                <div className="form-group">
                  <Field type="text" name="username" className={userNameClasses} placeholder="логин" required />
                  <ErrorMessage name="username" component="div" className="invalid-feedback" />
                </div>
                <div className="form-group">
                  <Field type="password" name="password" className={passwordClasses} placeholder="пароль" required />
                  <ErrorMessage name="password" component="div" className="invalid-feedback" />
                </div>
                <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                  Войти
                </button>
              </Form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default Login;
