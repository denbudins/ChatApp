import { Room } from '../models/room';
import { Message } from '../models/messages/message';
import { User } from '../models/users';
import { Command } from '../models/command/command';

import { UserService } from '../services/userService';

import { parseMessage } from '../utils/utils';
import { ServerServices } from '../services/serverService';

export type ServerMessageCallbackArgument = { room: Room; recipient: User; sender?: User; msg: Message };
export type ServerMessageCallback = (options: ServerMessageCallbackArgument) => Promise<void>;

export class Server {
  constructor(private msgCallbackFn: (options: ServerMessageCallbackArgument) => Promise<void>, private serverService: ServerServices = new ServerServices()) {}

  public async postMessage(msgSyntax: string): Promise<void> {
    // Parse message syntax
    let [senderUsername, password, roomName, message]: string[] = parseMessage(msgSyntax);
    senderUsername = senderUsername || 'ANONYMOUS';

    let room: Room | undefined = this.serverService.getRoom(roomName);
    let senderUser: User | undefined = User.isUserExistOnServer(senderUsername);

    // Check is command message
    let command = new Command(this.serverService, room, senderUser, this.msgCallbackFn);
    if (command.isCommandExist(message, password)) return;

    // Get room
    if (room === undefined) {
      command.runCommand('post', 'room error', '', password);
      return;
    }

    // Check if user joined room
    if (senderUser === undefined) {
      // Create new user
      if (room.status === 'non-open') return;
      senderUser = UserService.creatingNonRegisterUser(senderUsername);
      command.user = senderUser;
    }

    // Check if user newly joined
    if (!room.isUserExist(senderUser.userName)) {
      // Add newly joined user to room
      room.registerUser(senderUser);
      command.runCommand('post', 'join user', senderUser.userName, password);
    }

    command.runCommand('post', 'send message', message, password);
  }
}
