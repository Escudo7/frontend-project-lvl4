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
import { useTranslation } from 'react-i18next';
import { closeModal } from '../../slices/modalSlice.js';

const CreateChannel = ({ socket }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
      .required(t('errors.required'))
      .test('unique', t('errors.unique'), (value) => (
        !channels.find((c) => c.name === value?.trim())
      )),
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
              <Modal.Title>{t('chat.renameChannel')}</Modal.Title>
            </Modal.Header>
            <Form>
              <Modal.Body>
                <Field id="channelName" type="text" name="channelName" className={channelNameClasses} autoFocus />
                <label className="sr-only" htmlFor="channelName">{t('chat.channelName')}</label>
                <ErrorMessage name="channelName" component="div" className="invalid-feedback" htmlFor="channelName" />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeHandler}>
                  {t('buttons.cancel')}
                </Button>
                <Button variant="primary" disabled={isSubmitting} type="submit">
                  {t('buttons.send')}
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
