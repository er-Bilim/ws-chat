import type { IMessage } from '../../../types/message.types.ts';

interface ISendMessageAction {
  type: 'SEND';
  payload: IMessage;
}

interface INewMessageAction {
  type: 'NEW';
  payload: IMessage | IMessage[];
}

export type IIncomingDataMessage = ISendMessageAction | INewMessageAction;
