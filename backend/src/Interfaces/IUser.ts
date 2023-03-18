interface IUser {
  id?: number;
  email: string;
  name: string;
  password: string;
  admin: boolean;
}

export default IUser;