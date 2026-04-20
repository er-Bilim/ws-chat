export interface IAuthData {
  refreshToken: string;
}

export interface IIncomingDataAuth {
  type: 'LOGIN';
  payload: IAuthData;
}
