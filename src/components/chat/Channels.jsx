import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { setActiveChannelId } from '../../slices/channelsSlice.js';
import { openModal } from '../../slices/modalSlice.js';

const Channels = ({ channels, activeChannelId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const setActiveChannelHandler = (channelId) => () => {
    dispatch(setActiveChannelId(channelId));
  };

  const addChannelHandler = () => {
    dispatch(openModal({ modalType: 'createChannel' }));
  };

  const channelActionSelectHandler = (channelId) => (modalType) => {
    dispatch(openModal({ modalType, modalData: { channelId } }));
  };

  return (
    <div className="col-4 col-md-2 border-right pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 pl-4 pr-2">
        <span>{t('chat.channels')}</span>
        <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={addChannelHandler}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="d-none">+</span>
        </button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {channels.map((channel) => {
          const variant = channel.id === activeChannelId ? 'secondary' : '';

          return (
            <Dropdown
              as={ButtonGroup}
              key={channel.id}
              className="d-flex w-100"
              onSelect={channelActionSelectHandler(channel.id)}
            >
              <Button
                variant={variant}
                className="text-left text-truncate rounded-0 w-100"
                onClick={setActiveChannelHandler(channel.id)}
              >
                {`# ${channel.name}`}
              </Button>
              {channel.removable && (
                <>
                  <Dropdown.Toggle
                    split
                    variant={variant}
                    id={`dropdown-${channel.id}`}
                    className="flex-grow-0"
                  >
                    <span className="d-none">{t('buttons.channelManage')}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="removeChannel">{t('chat.remove')}</Dropdown.Item>
                    <Dropdown.Item eventKey="renameChannel">{t('chat.rename')}</Dropdown.Item>
                  </Dropdown.Menu>
                </>
              )}
            </Dropdown>
          );
        })}
      </ul>
    </div>
  );
};

export default Channels;
