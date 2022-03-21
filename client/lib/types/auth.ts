export type IUser = {
  avatar: string | null;
  email: string;
  id: number;
  name: string;
};


export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister extends ILogin {
  name: string;
}