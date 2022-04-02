import CreateChannel from './CreateChannel.jsx';
import RenameChannel from './RenameChannel.jsx';

const map = {
  createChannel: CreateChannel,
  renameChannel: RenameChannel,
};

export default (type) => map[type];
