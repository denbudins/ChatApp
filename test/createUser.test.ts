import { Command } from '../command/command';
import { Server } from '../models/server';
import { User } from '../models/users';
import { UserService } from '../services/userService';

describe('testing create user command', () => {
  let server: Server;

  beforeEach(() => {
    server = new Server();
  });

  test('create new non-register user', () => {
    const output = UserService.creatingNonRegisterUser('neho');

    expect(output.userName).toEqual('neho');
    expect(output.password).toEqual(null);
    expect(output.isUserRegister).toEqual(false);
  });

  test('create new register user', () => {
    const output = UserService.createNewRegisterUser('neho', '12345');

    expect(output.userName).toEqual('neho');
    expect(output.password).toEqual('12345');
    expect(output.isUserRegister).toEqual(true);
  });

  test('create new register user whit command', () => {
    const input = '/create user roger 12345';

    const command = new Command(server, undefined, undefined);

    const output = command.isCommandExist(input, null);

    const user: User | undefined = User.isUserExistOnServer('roger');

    expect(output).toEqual(true);
    expect(user).not.toEqual(undefined);
    expect(user?.userName).toEqual('roger');
    expect(user?.password).toEqual('12345');
    expect(user?.isUserRegister).toEqual(true);
  });

  test('create new non-register user whit command', () => {
    const input = '/create user echo';

    const command = new Command(server, undefined, undefined);

    const output = command.isCommandExist(input, null);

    const user: User | undefined = User.isUserExistOnServer('echo');

    expect(output).toEqual(true);
    expect(user).not.toEqual(undefined);
    expect(user?.userName).toEqual('echo');
    expect(user?.password).toEqual(null);
    expect(user?.isUserRegister).toEqual(false);
  });
});
