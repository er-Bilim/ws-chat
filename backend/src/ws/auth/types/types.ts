import type { IUserSend } from '../../../types/user.types.ts';

export interface IAuthData {
  user: IUserSend;
}

export interface IIncomingDataAuth {
  type: 'LOGIN';
  payload: IAuthData;
}
