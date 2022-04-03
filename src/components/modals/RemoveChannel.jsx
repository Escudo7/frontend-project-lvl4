import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { closeModal } from '../../slices/modalSlice.js';

const RemoveChannel = ({ socket }) => {
  const dispatch = useDispatch();

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
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Уверены?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeHandler}>
          Отменить
        </Button>
        <Button variant="danger" onClick={removeHandler}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannel;
