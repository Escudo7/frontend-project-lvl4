import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { addMessage } from '../slices/messagesSlice.js';
import { addChannel, removeChannel, renameChannel } from '../slices/channelsSlice.js';

const Socket = ({ socket, children }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  socket.on('newMessage', (message) => {
    dispatch(addMessage(message));

    const messagesBlock = document.querySelectorAll('#messages-box div');
    const messagesLength = messagesBlock.length;

    if (messagesLength > 0) {
      const lastMessageBlock = messagesBlock[messagesLength - 1];
      lastMessageBlock.scrollIntoView();
    }
  });

  socket.on('newChannel', (channel) => {
    dispatch(addChannel(channel));
    toast.success(t('messages.addChannel'));
  });

  socket.on('renameChannel', (channel) => {
    dispatch(renameChannel(channel));
    toast.success(t('messages.renameChannel'));
  });

  socket.on('removeChannel', (data) => {
    dispatch(removeChannel(data));
    toast.success(t('messages.removeChannel'));
  });

  socket.on('connect_error', () => {
    toast.error(t('messages. connectionError'));
  });

  return children;
};

export default Socket;
