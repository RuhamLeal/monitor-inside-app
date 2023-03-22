import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Admin } from '../Interfaces/IUser';

const jwtSecret:jwt.Secret = process.env.JWT_SECRET as string;

const jwtAuthentication = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ message: 'Token Inexistente' });

  try {
    const payload = jwt.verify(token, jwtSecret);
    req.user = payload as Admin;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token Inválido' });
  }
};

export default jwtAuthentication;
