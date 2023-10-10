import { User } from '../models/users';
import { UserService } from '../services/userService';

describe('testing user authentication', () => {
  let user: User;
  beforeEach(() => {
    user = new User('test');
  });
  test('check authentication for non-register user', () => {
    const output = UserService.authentications(user, null);

    expect(output).toEqual(false);
  });
  test('check authentication for register user whit correct password', () => {
    user.password = '12345';
    user.isUserRegister = true;
    const output = UserService.authentications(user, '12345');

    expect(output).toEqual(true);
  });
  test('check authentication for register user whit not correct password', () => {
    user.password = '12345';
    user.isUserRegister = true;
    const output = UserService.authentications(user, '123456');

    expect(output).toEqual(false);
  });
});
