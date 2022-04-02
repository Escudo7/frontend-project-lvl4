import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import * as Yup from 'yup';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import classNames from 'classnames';
import _ from 'lodash';
import { closeModal } from '../../slices/modalSlice.js';
import { setActiveChannelId } from '../../slices/channelsSlice.js';

const CreateChannel = ({ socket }) => {
  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch(closeModal());
  };

  const { channels } = useSelector((state) => state.channels.value);

  const addChannelSchema = Yup.object().shape({
    channelName: Yup.string()
      .required('Обязательное поле')
      .test('unique', 'Должно быть уникальным', (value) => (
        !channels.find((channel) => channel.name === value?.trim())
      )),
  });

  return (
    <Formik
      initialValues={{ channelName: '' }}
      onSubmit={async ({ channelName }) => {
        const channel = { name: channelName };
        socket.emit('newChannel', channel, ({ status, data }) => {
          if (status === 'ok') {
            dispatch(closeModal());
            dispatch(setActiveChannelId(data.id));
          }
        });
      }}
      validationSchema={addChannelSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ isSubmitting, errors }) => {
        const channelNameClasses = classNames('form-control', {
          'is-invalid': _.has(errors, 'channelName'),
        });

        return (
          <Modal show>
            <Modal.Header>
              <Modal.Title>Добавить канал</Modal.Title>
            </Modal.Header>
            <Form>
              <Modal.Body>
                <Field type="text" name="channelName" className={channelNameClasses} autoFocus />
                <ErrorMessage name="channelName" component="div" className="invalid-feedback" />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeHandler}>
                  Отменить
                </Button>
                <Button variant="primary" disabled={isSubmitting} type="submit">
                  Отправить
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        );
      }}
    </Formik>
  );
};

export default CreateChannel;
