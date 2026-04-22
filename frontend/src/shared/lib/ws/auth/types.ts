import type { IUser } from '@/entities/user/model/types';

interface IUserLoginAction {
  type: 'LOGIN';
  payload: IUser;
}

interface ILoggedUser {
  type: 'USER_CONNECTED';
  payload: IUser;
}

interface ILoggedUsers {
  type: 'USER_LIST';
  payload: IUser[];
}

export type IIncomingDataAuth = IUserLoginAction | ILoggedUser | ILoggedUsers;
