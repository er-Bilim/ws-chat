import type { HydratedDocument } from 'mongoose';
import Message from '../../model/message/Message.ts';
import type { IMessageSave } from '../../types/message.types.ts';

interface IMessageService {
  getLastMessages: (limit: number) => Promise<IMessageSave[]>;
  newMessage: (data: IMessageSave) => Promise<HydratedDocument<IMessageSave>>;
}

const MessageService: IMessageService = {
  async newMessage(data) {
    const message = new Message(data);

    return await message.save();
  },

  async getLastMessages(limit) {
    const messages = await Message.find().populate('user');
    const lastMessages = messages.slice(-limit);
    const sortedMessages: IMessageSave[] = lastMessages
      .sort(
        (a, b) =>
          new Date(a.datetime).getTime() - new Date(b.datetime).getTime(),
      )
      .slice(0, limit);

    return sortedMessages;
  },
};

export default MessageService;
