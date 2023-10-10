import { msgCallbackFn } from '..';
import { Command } from '../command/command';
import { Room } from '../models/room';
import { Server } from '../models/server';
import { User } from '../models/users';

describe('testing rename commands', () => {
  let server: Server;
  const rooms: Room[] = [new Room('son', msgCallbackFn), new Room('numb', msgCallbackFn), new Room('happy', msgCallbackFn)];

  beforeEach(() => {
    server = new Server();

    for (const room of rooms) {
      server.addNewRoom(room);
    }
  });

  test('rename username', () => {
    const input = '/rename self neho';

    const user = new User('echo');
    server.getRoom('son')?.registerUser(user);
    server.getRoom('happy')?.registerUser(user);

    const command = new Command(server, undefined, user);
    const output = command.isCommandExist(input, null);

    const outputUser = User.isUserExistOnServer('neho');

    expect(output).toEqual(true);
    expect(outputUser).not.toEqual(undefined);
    expect(outputUser?.userName).toEqual('neho');
  });

  test('rename room name', () => {
    const input = '/rename room sonne';

    const room = server.getRoom('son');

    const command = new Command(server, room, undefined);
    const output = command.isCommandExist(input, null);

    const outputRoom = server.getRoom('sonne');

    expect(output).toEqual(true);
    expect(outputRoom).not.toEqual(undefined);
    expect(outputRoom?.name).toEqual('sonne');
  });
});
