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

const signUpSchema = Yup.object().shape({
  username: Yup.string()
    .required('Обязательное поле')
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов'),
  password: Yup.string()
    .required('Обязятельное поле')
    .min(6, 'От 6 символов'),
  confirmPassword: Yup.string()
    .required('Обязятельное поле')
    .oneOf([Yup.ref('password')], 'Пароли должны совпадать'),
});

const SignUp = () => {
  const navigate = useNavigate();

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
            username: 'Такой пользователь уже существует',
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
          <div className="container">
            <div className="row justify-content-md-center">
              <h3>Регистрация</h3>
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
                <div className="form-group">
                  <Field type="password" name="confirmPassword" className={confirmPasswordClasses} placeholder="подтвердите пароль" required />
                  <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                </div>
                <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                  Зарегистрироваться
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
