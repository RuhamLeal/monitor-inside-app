import { ILogin } from '@/interfaces/ILogin';
import { loginSchema } from './validSchemas';

type erroRes = {
  err: string | false
}

const loginValidation = (loginData: ILogin): erroRes => {
  const { error } = loginSchema.validate(loginData);
  if (error) {
    return { err: error.details[0].message };
  }
  return { err: false };
};

export default loginValidation;
