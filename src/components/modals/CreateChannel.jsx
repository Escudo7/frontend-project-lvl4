import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    >
      {({ isSubmitting, errors }) => {
        const channelNameClasses = classNames('form-control', {
          'is-invalid': _.has(errors, 'channelName'),
        });

        return (
          <Form>
            <div className="fade modal-backdrop show" />
            <div
              role="dialog"
              className="modal fade show"
              id="createChannel"
              tabIndex="-1"
              aria-labelledby="createChannelLabel"
              style={{ display: 'block' }}
              aria-modal
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="createChannelLabel">Добавить канал</h5>
                    <button type="button" className="btn close" data-bs-dismiss="modal" aria-label="Close" onClick={closeHandler}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <Field type="text" name="channelName" className={channelNameClasses} autoFocus />
                    <ErrorMessage name="channelName" component="div" className="invalid-feedback" />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeHandler}>
                      Отменить
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                      Отправить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateChannel;
