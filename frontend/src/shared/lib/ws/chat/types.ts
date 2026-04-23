import type { IMessage } from '@/entities/message/model/types';
import type { IUser } from '@/entities/user/model/types';

interface ISendMessage {
  type: 'SEND';
  payload: {
    message: string;
  };
}

interface INewMessage {
  type: 'NEW';
  payload: {
    _id: string;
    user: IUser;
    content: string;
  };
}

interface ILastMessages {
  type: 'LAST_MESSAGES';
  payload: IMessage[];
}

export type IIncomingDataChat = ISendMessage | INewMessage | ILastMessages;
