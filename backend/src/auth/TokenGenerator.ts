import jwt from 'jsonwebtoken';
import 'dotenv/config';

const jwtSecret:jwt.Secret = process.env.JWT_SECRET as string;

export default class JWT {
  public static generateToken(data: object = {}): string {
    const token = jwt.sign(
      data,
      jwtSecret,
      { expiresIn: '6h', algorithm: 'HS256' },
    );
  
    return token;
  };
}
