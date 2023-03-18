interface IUser {
  id?: number;
  email: string;
  name: string;
  password: string;
  admin: boolean;
}

export interface Login {
  email: string;
  password: string;
}

export interface Admin {
  id: number;
  admin: boolean;
  email: string;
}

export default IUser;