import { v4 } from 'uuid';
export class User {
  private static users: User[] = [];
  public uuid: string;

  public static isUserExistOnServer(user: string): User | undefined {
    return this.users.find(({ uuid, userName }) => uuid === user || userName === user);
  }

  constructor(public userName: string) {
    this.uuid = v4();
    User.users.push(this);
  }
}

export class ServerUser extends User {
  constructor() {
    super('SERVER');
  }
}

export class AnonymousUser extends User {
  constructor() {
    super('ANONYMOUS');
  }
}

// Create and register platform user
export const platformUser = new ServerUser();
// Create and register anonymous user
export const anonymousUser = new AnonymousUser();
