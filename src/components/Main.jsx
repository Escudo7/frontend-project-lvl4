import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import classNames from 'classnames';
import {
  Formik,
  Form,
  Field,
} from 'formik';
import { logOut } from '../slices/authorizedSlice.js';
import { loadChannels, setActiveChannelId } from '../slices/channalsSlice.js';
import { loadMessages } from '../slices/messagesSlice.js';

const renderChannels = (channels, activeChannelId) => (
  channels.map((channel) => {
    const classes = classNames('w-100', 'rounded-0', 'text-left', 'btn', {
      'btn-secondary': channel.id === activeChannelId,
    });

    return (
      <button type="button" className={classes} key={channel.id}>
        <span className="me-1">#</span>
        {channel.name}
      </button>
    );
  })
);

const renderMessages = (messages) => (
  <div id="messages-box" className="overflow-auto px-5 mr-3">
    {messages.map((message) => (
      <div className="text-break mb-2" key={message.id}>
        <b>{message.userName}</b>
        {` ${message.body}`}
      </div>
    ))}
  </div>
);

const Main = ({ socket }) => {
  const [userName, setUserName] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { channels, activeChannelId } = useSelector((state) => state.channels.value);
  const activeChannel = channels.find((channel) => channel.id === activeChannelId);
  const messages = useSelector((state) => state.messages.value);
  const activeChannelMessages = messages.filter((message) => message.channelId === activeChannelId);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token === null) {
      navigate('/login');
    }

    setUserName(localStorage.getItem('username'));

    const loadData = async () => {
      const instance = axios.create({
        headers: { Authorization: `Bearer ${token}` },
      });

      try {
        const { data } = await instance.get('/api/v1/data');

        dispatch(loadChannels(data.channels));
        dispatch(loadMessages(data.messages));
        dispatch(setActiveChannelId(data.currentChannelId));
      } catch (e) {
        localStorage.removeItem('chat-token');
        dispatch(logOut());
        navigate('/login');
      }
    };

    loadData();
  }, []);

  const messageSubmitHandler = async (data, { resetForm }) => {
    const { body } = data;
    const message = {
      channelId: activeChannelId,
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
    <div className="container-xxl mx-5 my-4 h-100 overflow-hidden rounded shadow-lg">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-right pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 pl-4 pr-2">
            <span>Каналы</span>
            <button type="button" className="p-0 text-primary btn btn-group-vertical">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
            </button>
          </div>
          <ul className="nav flex-column nav-pills nav-fill px-2">
            <li className="nav-item w-100">
              {renderChannels(channels, activeChannelId)}
            </li>
          </ul>
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm">
              <p className="m-0">
                <b>{activeChannel && `# ${activeChannel.name}`}</b>
              </p>
              <span className="text-muted">
                {`${activeChannelMessages.length} `}
                сообщения
              </span>
            </div>
            {renderMessages(activeChannelMessages)}
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
                        aria-label="Новое сообщение"
                        placeholder="Введите сообщение..."
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
      </div>
    </div>
  );
};

export default Main;
