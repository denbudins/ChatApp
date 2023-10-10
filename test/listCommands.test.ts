import { msgCallbackFn } from '..';
import { Command } from '../command/command';
import { Room } from '../models/room';
import { Server } from '../models/server';
import { User } from '../models/users';

describe('testing list commands', () => {
  let server: Server;
  const rooms: Room[] = [new Room('son', msgCallbackFn), new Room('numb', msgCallbackFn), new Room('happy', msgCallbackFn)];

  beforeEach(() => {
    server = new Server();

    for (const room of rooms) {
      server.addNewRoom(room);
    }
  });

  test('call list room command and execute', () => {
    const input = '/list rooms';

    const user = new User('echo');
    server.getRoom('son')?.registerUser(user);
    server.getRoom('happy')?.registerUser(user);

    const command = new Command(server, undefined, user);
    const output = command.isCommandExist(input, null);
  });
  test('call list messages command and execute', () => {});
  test('call list user command and execute', () => {});
});
