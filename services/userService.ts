import { User } from '../models/users';

export class UserService {
  static creatingNonRegisterUser(userName: string): User {
    const user = new User(userName);
    return user;
  }

  static createNewRegisterUser(userName: string, password: string): User {
    const user = new User(userName);
    user.password = password;
    user.isUserRegister = true;
    return user;
  }

  static authentications(user: User, password: string | null): boolean {
    if (user === undefined || user.password !== password || !user.isUserRegister) return false;
    return true;
  }
}
