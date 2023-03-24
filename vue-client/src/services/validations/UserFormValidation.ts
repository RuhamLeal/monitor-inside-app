import { userFormSchema } from './validSchemas';

type erroRes = {
  err: string | false
}

const userFormValidation = (data: any): erroRes => {
  const { error } = userFormSchema.validate(data);
  if (error) {
    return { err: error.details[0].message };
  }
  return { err: false };
};

export default userFormValidation;
