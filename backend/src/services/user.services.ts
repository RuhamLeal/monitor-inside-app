import prisma from "../models/prismaClientConnection";
import bcrypt from 'bcryptjs';
import User from "../Domains/User";
import IUser, { Admin, Login } from "../Interfaces/IUser";
import UserValidation from "./validations/UserValidation";
import JWT from "../auth/TokenGenerator";
import NotFoundException from "../Exceptions/NotFound";
import UnauthorizedException from "../Exceptions/Unauthorized";
import UnprocessableException from "../Exceptions/Unprocessable";

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

    const users = await this.mysql_db.user.findMany({ where: { excluded: false } });

    if (users.length === 0) return [];

    return users.map((user) => this.createNewUserDomain(user));
  }

  public async updateUserById(userData: IUser, admin: Admin) {
    if (!admin.admin) {
      throw new UnauthorizedException('Usuario não autorizado');
    }

    UserValidation.validateUpdateData(userData);

    const userExist = await this.mysql_db.user
      .findFirst({ where: { id: userData.id } });

    if (!userExist) {
      throw new NotFoundException('Usuario inexistente');
    }

    const dataToUpdate = {
      email: userData.email,
      name: userData.name,
      password: bcrypt.hashSync(userData.password, 10),
      admin: userData.admin,
    }

    await this.mysql_db.user
      .update({ where: { id: userData.id }, data: dataToUpdate});

    return this.createNewUserDomain(userData);
  }

  public async deactivateUser(userId: number, admin: Admin) {
    if (!admin.admin) {
      throw new UnauthorizedException('Usuario não autorizado');
    }

    if (!Number.isInteger(userId)) {
      throw new UnprocessableException('Parametro Id do usuario não exite ou inserido incorretamente');
    }

    const userExist = await this.mysql_db.user
      .findFirst({ where: { id: userId } });

    if (!userExist) {
      throw new NotFoundException('Usuario inexistente');
    }

    const deletedUser = await this.mysql_db.user
      .update({ where: { id: userId }, data: { excluded: true }});

    return this.createNewUserDomain(deletedUser);
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

    return { token: JWT.generateToken(data), admin: data.admin, username: user.name};
  }
}