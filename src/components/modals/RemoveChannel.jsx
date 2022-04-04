import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../../slices/modalSlice.js';

const RemoveChannel = ({ socket }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { channels } = useSelector((state) => state.channels.value);
  const { modalData } = useSelector((state) => state.modal.value);
  const currentChannel = channels.find((c) => c.id === modalData.channelId);

  if (!currentChannel) {
    return null;
  }

  const closeHandler = () => {
    dispatch(closeModal());
  };

  const removeHandler = () => {
    socket.emit('removeChannel', currentChannel, ({ status }) => {
      if (status === 'ok') {
        dispatch(closeModal());
      }
    });
  };

  return (
    <Modal show>
      <Modal.Header>
        <Modal.Title>{t('chat.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t('chat.areYouSure')}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeHandler}>
          {t('buttons.cancel')}
        </Button>
        <Button variant="danger" onClick={removeHandler}>
          {t('buttons.remove')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannel;
