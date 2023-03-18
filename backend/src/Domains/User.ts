import IUser from '../Interfaces/IUser';

class User {
  private id?: number;
  private email: string;
  private name: string;
  private password: string;
  private admin: boolean;

  constructor(user: IUser) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.password = user.password;
    this.admin = user.admin;
  }
  
  public setId(id: number) { this.id = id }
  public getId(id: number) { return id }

  public setEmail(email: string) { this.email = email; }
  public getEmail(email: string) { return email; }

  public setName(name: string) { this.name = name; }
  public getName(name: string) { return name; }

  public setPassword(password: string) { this.password = password; }
  public getPassword(password: string) { return password; }

  public setAdmin(admin: boolean) { this.admin = admin; }
  public getAdmin(admin: boolean) { return admin; } 
}

export default User;