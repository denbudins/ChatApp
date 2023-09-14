export class User {
  private static users: User[] = [];

  public static isUserExistOnServer(user: string): User | undefined {
    return this.users.find(({ userName }) => userName === user);
  }

  constructor(public userName: string) {
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
