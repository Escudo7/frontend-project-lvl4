import React, { useEffect, useRef } from 'react';
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

const CreateChannel = ({ socket }) => {
  const dispatch = useDispatch();

  const closeHandler = () => {
    dispatch(closeModal());
  };

  const { channels } = useSelector((state) => state.channels.value);
  const { modalData } = useSelector((state) => state.modal.value);
  const currentChannel = channels.find((c) => c.id === modalData.channelId);

  if (!currentChannel) {
    return null;
  }

  const renameChannelSchema = Yup.object().shape({
    channelName: Yup.string()
      .required('Обязательное поле')
      .test('unique', 'Должно быть уникальным', (value) => (
        !channels.find((c) => c.name === value?.trim())
      )),
  });

  const inputChannelName = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      inputChannelName.current.select();
    });
  });

  return (
    <Formik
      initialValues={{ channelName: currentChannel.name }}
      onSubmit={async ({ channelName }) => {
        const channel = { id: modalData.channelId, name: channelName };
        socket.emit('renameChannel', channel, ({ status }) => {
          if (status === 'ok') {
            dispatch(closeModal());
          }
        });
      }}
      validationSchema={renameChannelSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ isSubmitting, errors }) => {
        const channelNameClasses = classNames('form-control', {
          'is-invalid': _.has(errors, 'channelName'),
        });

        return (
          <Modal show autoFocus={false}>
            <Modal.Header>
              <Modal.Title>Переименовать канал</Modal.Title>
            </Modal.Header>
            <Form>
              <Modal.Body>
                <Field type="text" name="channelName" className={channelNameClasses} autoFocus innerRef={inputChannelName} />
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
