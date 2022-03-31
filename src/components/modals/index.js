import CreateChannel from './CreateChannel.jsx';

const map = {
  createChannel: CreateChannel,
};

export default (type) => map[type];
