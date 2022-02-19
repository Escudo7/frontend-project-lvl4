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
                <div className="row justify-content-md-center">
                    <Form className="needs-validation col-md-4">
                        <div className="form-group">
                            <label htmlFor="login">Логин</label>
                            <Field type="text" name="login" className={loginClasses} />
                            <ErrorMessage name="login" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Пароль</label>
                            <Field type="password" name="password" className={passwordClasses} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                            Войти
                        </button>
                    </Form>
                </div>
            )
        }}
    </Formik>
);

export default Login;
