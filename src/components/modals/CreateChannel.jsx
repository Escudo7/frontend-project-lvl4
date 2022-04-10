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
import { useTranslation } from 'react-i18next';
import { closeModal } from '../../slices/modalSlice.js';
import { setActiveChannelId } from '../../slices/channelsSlice.js';

const CreateChannel = ({ socket }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const closeHandler = () => {
    dispatch(closeModal());
  };

  const { channels } = useSelector((state) => state.channels.value);

  const addChannelSchema = Yup.object().shape({
    channelName: Yup.string()
      .required(t('errors.required'))
      .test('unique', t('errors.unique'), (value) => (
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
              <Modal.Title>{t('chat.addChannel')}</Modal.Title>
            </Modal.Header>
            <Form className="needs-validation">
              <Modal.Body>
                <div className="form-group">
                  <Field
                    id="channelName"
                    type="text"
                    name="channelName"
                    className={channelNameClasses}
                    placeholder={t('chat.channelName')}
                    autoFocus
                  />
                  <label className="sr-only" htmlFor="channelName">{t('chat.channelName')}</label>
                  <ErrorMessage name="channelName" component="div" className="invalid-feedback" htmlFor="channelName" />
                </div>
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
