import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Field, Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';

const Messages = ({ activeChannel, socket }) => {
  const [userName, setUserName] = useState(null);
  const { t } = useTranslation();
  filter.loadDictionary('ru');

  const messages = useSelector((state) => state.messages.value);
  const activeChannelMessages = messages.filter(
    (message) => activeChannel && message.channelId === activeChannel.id,
  );

  useEffect(() => {
    setUserName(localStorage.getItem('username'));
  });

  const messageSubmitHandler = async (data, { resetForm }) => {
    const { body } = data;
    const message = {
      channelId: activeChannel.id,
      body,
      userName,
    };

    socket.emit('newMessage', message, (response) => {
      if (response.status === 'ok') {
        resetForm();
      }
    });
  };

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm">
          <p className="m-0">
            <b>{activeChannel && `# ${activeChannel.name}`}</b>
          </p>
          <span className="text-muted">
            {t('chat.message', { count: activeChannelMessages.length })}
          </span>
        </div>
        <div id="messages-box" className="overflow-auto px-5 mr-3">
          {activeChannelMessages.map((message) => (
            <div className="text-break mb-2" key={message.id}>
              <b>{message.userName}</b>
              {` ${filter.clean(message.body)}`}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <Formik
            initialValues={{ body: '' }}
            onSubmit={messageSubmitHandler}
          >
            {({ isSubmitting, values }) => (
              <Form className="py-1 border rounded-2">
                <div className="input-group has-validation">
                  <Field
                    name="body"
                    aria-label={t('chat.newMessage')}
                    placeholder={t('chat.typeNewMessage')}
                    className="border-0 p-0 pl-2 form-control"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || values.body === ''}
                    className="btn btn-group-vertical"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                      />
                    </svg>
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Messages;
