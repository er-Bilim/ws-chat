export interface IUser {
  id: string;
  avatar: string;
  username: string;
  phone_number: string;
  display_name: string;
  role: string;
}

export interface IUserAuth {
  message: string;
  user: IUser;
}

export interface IRegister {
  avatar?: File | null;
  username: string;
  phone_number: string;
  display_name: string;
  password: string;
}

export interface ILogin {
  username: string;
  password: string;
}
