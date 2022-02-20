import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';

const loginSchema = Yup.object().shape({
    login: Yup.string()
        .required('Обязательное поле'),
    password: Yup.string()
        .required('Обязятельное поле'),
});

const Login = () => (
    <Formik
        initialValues={{ login: '', password: '' }}
        onSubmit={(values, { resetForm, setSubmitting }) => {
            console.log(values)
            setTimeout(() => {
                setSubmitting(false);
                //resetForm();
            }, 400);
        }}
        validationSchema={loginSchema}
    >
        {({ isSubmitting, errors }) => {
            const loginClasses = classNames('form-control', {
                'is-invalid': errors.login,
            });
            const passwordClasses = classNames('form-control', {
                'is-invalid': errors.password,
            });
            return (
                <div className="container">
                    <div className="row justify-content-md-center">
                        <h3>Вход</h3>
                    </div>
                    <div className="row justify-content-md-center">
                        <Form className="needs-validation col-md-4">
                            <div className="form-group">
                                <Field type="text" name="login" className={loginClasses} placeholder="логин" required />
                                <ErrorMessage name="login" component="div" className="invalid-feedback" />
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

export default Login;
