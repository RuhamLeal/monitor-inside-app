import { NextFunction, Request, Response } from 'express';
import IUser, { Login } from '../Interfaces/IUser';
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

  public async getAllUsers() {
    try {
      const admin = this.req.user;

      const users = await this.userService.findAllUsers(admin);

      return this.res.status(200).json(users);
    } catch (error) {
      this.next(error);
    }
  }

  public async postNewUser() {
    try {
      const admin = this.req.user;
      const newUser: IUser = this.req.body;
      const createdUser = await this.userService.registerNewUser(newUser, admin);

      return this.res.status(201).json(createdUser);
    } catch (error) {
      this.next(error);
    }
  }

  public async login() {
    try {
      const loginData: Login = this.req.body;
      
      const response = await this.userService.login(loginData);

      return this.res.status(200).json(response);
    } catch (error) {
      this.next(error);
    }
  }
}

export default UserController;