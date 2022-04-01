import React from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { setActiveChannelId } from '../../slices/channelsSlice.js';
import { openModal } from '../../slices/modalSlice.js';

const Channels = ({ channels, activeChannelId }) => {
  const dispatch = useDispatch();

  const setActiveChannelHandler = (channelId) => () => {
    dispatch(setActiveChannelId(channelId));
  };

  const addChannelHandler = () => {
    dispatch(openModal('createChannel'));
  };

  return (
    <div className="col-4 col-md-2 border-right pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 pl-4 pr-2">
        <span>Каналы</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={addChannelHandler}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        <li className="nav-item w-100">
          {channels.map((channel) => {
            const classes = classNames('w-100', 'rounded-0', 'text-left', 'btn', {
              'btn-secondary': channel.id === activeChannelId,
            });

            return (
              <button type="button" className={classes} key={channel.id} onClick={setActiveChannelHandler(channel.id)}>
                <span className="me-1">#</span>
                {channel.name}
              </button>
            );
          })}
        </li>
      </ul>
    </div>
  );
};

export default Channels;
