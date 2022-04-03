import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { loadChannels, setActiveChannelId } from '../../slices/channelsSlice.js';
import { loadMessages } from '../../slices/messagesSlice.js';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import modalMap from '../modals/index.js';

const Main = ({ socket }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { channels, activeChannelId } = useSelector((state) => state.channels.value);
  const activeChannel = channels.find((channel) => channel.id === activeChannelId);

  const { modalType } = useSelector((state) => state.modal.value);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token === null) {
      navigate('/login');
    }

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
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login');
      }
    };

    loadData();
  }, []);

  const renderModal = (type) => {
    if (type === null) {
      return null;
    }

    const Modal = modalMap(type);

    return <Modal socket={socket} />;
  };

  return (
    <div className="container-xxl mx-5 my-4 h-100 overflow-hidden rounded shadow-lg">
      {renderModal(modalType)}
      <div className="row h-100 bg-white flex-md-row">
        <Channels channels={channels} activeChannelId={activeChannelId} />
        <Messages activeChannel={activeChannel} socket={socket} />
      </div>
    </div>
  );
};

export default Main;
