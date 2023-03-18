import prisma from "../models/prismaClientConnection";
import User from "../Domains/User";
import IUser from "../Interfaces/IUser";
import UserValidation from "./validations/UserValidation";

export default class UserService {
  private createNewUserDomain(newUser: IUser | null): User | null {
    if (newUser) return new User(newUser);
  
    return null;
  }

  constructor(private mysql_db = prisma) {}

  public async registerNewUser(newUser: IUser) {
    UserValidation.validateSignin(newUser);

    const user = await this.mysql_db.user.create({ data: newUser });

    return this.createNewUserDomain(user);
  }
}