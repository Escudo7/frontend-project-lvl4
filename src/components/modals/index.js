import CreateChannel from './CreateChannel.jsx';
import RenameChannel from './RenameChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';

const map = {
  createChannel: CreateChannel,
  renameChannel: RenameChannel,
  removeChannel: RemoveChannel,
};

export default (type) => map[type];
