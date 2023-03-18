import { NextFunction, Request, Response } from 'express';
import IUser from '../Interfaces/IUser';
import UserService from '../services/user.services';


class UserController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private userService: UserService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.userService = new UserService();
  }

  public async postNewUser() {
    try {
      const newUser: IUser = this.req.body;
      const createdUser = await this.userService.registerNewUser(newUser);

      return this.res.status(201).json(createdUser);
    } catch (error) {
      this.next(error);
    }
  }
}

export default UserController;