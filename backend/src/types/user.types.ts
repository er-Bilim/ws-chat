export interface IUser {
  id: string;
  avatar: string | null;
  username: string;
  phone_number: string;
  display_name: string;
  password: string;
  role: string;
  refreshToken: string;
}

export interface IUserSend {
  id: string;
  avatar: string | null;
  username: string;
  phone_number: string;
  display_name: string;
}

export type IUserSave = Omit<IUser, 'id' | 'role' | 'refreshToken'>;
export type IUserReg = Omit<IUser, 'id' | 'role' | 'refreshToken'>;
