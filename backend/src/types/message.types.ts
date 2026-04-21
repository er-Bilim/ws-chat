import type { IUserSend } from './user.types.ts';
import mongoose from 'mongoose';

export interface IMessage {
  user: IUserSend;
  message: string;
  datetime: string;
}

export interface IMessageSave {
  user: mongoose.Types.ObjectId | string;
  content: string;
}
