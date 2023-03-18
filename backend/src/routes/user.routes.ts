import { Router } from 'express';
import jwtAuthentication from '../middlewares/Authentication';
import UserController from '../controllers/user.controllers';

const userRouter = Router();

userRouter
  .get(
    '/user',
    jwtAuthentication,
    (req, res, next) => new UserController(req, res, next).getAllUsers(),
  )
  .post(
    '/user/login',
    (req, res, next) => new UserController(req, res, next).login(),
  )
  .post(
    '/user/signin',
    jwtAuthentication,
    (req, res, next) => new UserController(req, res, next).postNewUser(),
  );

export default userRouter;
