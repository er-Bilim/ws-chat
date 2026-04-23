import type { IUserSend } from './user.types.ts';
import mongoose from 'mongoose';

export interface IMessage {
  _id: string;
  user: IUserSend;
  message: string;
}

export interface IMessageSave {
  user: mongoose.Types.ObjectId | string;
  content: string;
}
