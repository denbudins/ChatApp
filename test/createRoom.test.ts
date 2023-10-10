import { Command } from '../command/command';
import { Room } from '../models/room';
import { Server } from '../models/server';
import { User } from '../models/users';

describe('testing create room command', () => {
  let server: Server;
  beforeEach(() => {
    server = new Server();
  });

  test('create new open room', () => {
    const input = '/create room numb open';
    const input2 = '/create room son';

    const command = new Command(server, undefined, undefined);

    command.isCommandExist(input, null);
    command.isCommandExist(input2, null);

    const output: Room | undefined = server.getRoom('numb');
    const output2: Room | undefined = server.getRoom('son');

    expect(output?.name).toEqual('numb');
    expect(output?.status).toEqual('open');
    expect(output2?.name).toEqual('son');
    expect(output2?.status).toEqual('open');
  });

  test('create new non-open room whit register user', () => {
    const input = '/create room numb non-open';

    let registerUser = new User('roger');
    registerUser.password = '12345';
    registerUser.isUserRegister = true;

    const command = new Command(server, undefined, registerUser);

    command.isCommandExist(input, registerUser.password);

    const output: Room | undefined = server.getRoom('numb');

    expect(output?.name).toEqual('numb');
    expect(output?.status).toEqual('non-open');
  });

  test('create new non-open room whit non-register user', () => {
    const input = '/create room numb non-open';

    let nonRegisterUser = new User('echo');

    const command = new Command(server, undefined, nonRegisterUser);

    command.isCommandExist(input, null);

    const output: Room | undefined = server.getRoom('numb');

    expect(output).toEqual(undefined);
  });
});
