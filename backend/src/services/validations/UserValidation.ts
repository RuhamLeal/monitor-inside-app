import UnprocessableException from '../../Exceptions/Unprocessable';
import IUser from '../../Interfaces/IUser';

export default class UserValidation {
  public static validateSignin(signin: any): void {
    const fields = ['email', 'name', 'password', 'admin'];

    fields.forEach((field) => {
      if (field === 'admin' && typeof signin[field] !== 'boolean') {
        throw new UnprocessableException('Campo "admin" não exite ou inserido incorretamente');
      };

      if (typeof signin[field] !== 'string') {
        throw new UnprocessableException(`Campo ${field} não exite ou inserido incorretamente`);
      }
    })
  }
}
