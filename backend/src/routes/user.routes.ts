import { Router } from 'express';
import UserController from '../controllers/user.controllers';

const userRouter = Router();

userRouter.post(
  '/user',
  (req, res, next) => new UserController(req, res, next).postNewUser(),
);

export default userRouter;
