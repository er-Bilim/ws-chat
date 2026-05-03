import type { IUser } from '@/entities/user/model/types';

export interface IMessage {
  _id: string;
  user: IUser;
  content: string;
}

export interface INewMessage {
  _id: string;
  user: IUser;
  content: string;
}
