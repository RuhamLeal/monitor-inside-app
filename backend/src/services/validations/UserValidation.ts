import UnprocessableException from '../../Exceptions/Unprocessable';
import IUser from '../../Interfaces/IUser';

export default class UserValidation {
  public static validateSignin(signin: any): void {
    const fields = ['email', 'name', 'password', 'admin'];

    fields.forEach((field) => {
      if (field === 'admin' && typeof signin[field] !== 'boolean') {
        throw new UnprocessableException('Campo "admin" não exite ou inserido incorretamente');
      };

      if (field !== 'admin' && typeof signin[field] !== 'string') {
        throw new UnprocessableException(`Campo ${field} não exite ou inserido incorretamente`);
      }
    })
  }

  public static validateLogin(login: any): void {
    const fields = ['email', 'password'];

    fields.forEach((field) => {
      if (typeof login[field] !== 'string') {
        throw new UnprocessableException(`Campo ${field} não exite ou inserido incorretamente`);
      }
    })
  }

  public static validateUpdateData(data: any): void {
    const fields = ['email', 'password', 'name', 'admin'];

    if (!Number.isInteger(data.id)) {
      throw new UnprocessableException('Campo "id" não exite ou inserido incorretamente');
    }

    fields.forEach((field) => {
      if (field === 'admin' && typeof data[field] !== 'boolean') {
        throw new UnprocessableException('Campo "admin" não exite ou inserido incorretamente');
      };

      if (field !== 'admin' && typeof data[field] !== 'string') {
        throw new UnprocessableException(`Campo ${field} não exite ou inserido incorretamente`);
      }
    })
  }
}
