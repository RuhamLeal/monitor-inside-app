import prisma from "../models/prismaClientConnection";
import bcrypt from 'bcryptjs';
import User from "../Domains/User";
import IUser, { Admin, Login } from "../Interfaces/IUser";
import UserValidation from "./validations/UserValidation";
import JWT from "../auth/TokenGenerator";
import NotFoundException from "../Exceptions/NotFound";
import UnauthorizedException from "../Exceptions/Unauthorized";

export default class UserService {
  private createNewUserDomain(newUser: IUser | null): User | null {
    if (newUser) return new User(newUser);
  
    return null;
  }

  constructor(private mysql_db = prisma) {}

  public async findAllUsers(admin: Admin) {
    if (!admin.admin) {
      throw new UnauthorizedException('Usuario não autorizado');
    }

    const users = await this.mysql_db.user.findMany();

    console.log(users);

    if (users.length === 0) return [];

    return users.map((user) => this.createNewUserDomain(user));
  }

  public async registerNewUser(newUser: IUser, admin: Admin) {
    UserValidation.validateSignin(newUser);

    if (!admin.admin) {
      throw new UnauthorizedException('Usuario não autorizado');
    }

    newUser.password = bcrypt.hashSync(newUser.password, 10);

    const user = await this.mysql_db.user.create({ data: newUser });

    return this.createNewUserDomain(user);
  }

  public async login(loginData: Login) {
    UserValidation.validateLogin(loginData);

    const { email, password } = loginData;

    const user = await this.mysql_db.user.findFirst({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new NotFoundException('Email ou senha incorretos');
    }

    const data = {
      id: user.id,
      email: user.email,
      admin: user.admin
    }

    return { token: JWT.generateToken(data)};
  }
}