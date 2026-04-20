export interface IUser {
  avatar: string | null;
  username: string;
  phone_number: string;
  display_name: string;
  password: string;
  role: string;
  refreshToken: string;
}

export type IUserSave = Omit<IUser, 'role' | 'refreshToken'>;
export type IUserReg = Omit<IUser, 'role' | 'refreshToken'>;
