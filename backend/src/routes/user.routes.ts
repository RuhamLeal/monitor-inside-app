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
  .put(
    '/user',
    jwtAuthentication,
    (req, res, next) => new UserController(req, res, next).updateUserById(),
  )
  .delete(
    '/user/:id',
    jwtAuthentication,
    (req, res, next) => new UserController(req, res, next).deleteUserById(),
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
