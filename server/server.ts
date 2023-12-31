import { Server as ServerModel } from '../models/server';
import { Room } from '../models/room';
import { Message } from '../models/messages/message';
import { User } from '../models/users';
import { Command } from '../command/command';

import { UserService } from '../services/userService';

import { parseMessage, wait } from '../utils/utils';
import { PostJoinUser, PostRoomError, PostSendMessage } from '../command/post/postCommand';
import { RoomService } from '../services/roomService';
import { ServerServices, serverService } from '../services/serverService';

export type ServerMessageCallbackArgument = { room: Room; recipient: User; sender?: User; msg: Message };
export type ServerMessageCallback = (options: ServerMessageCallbackArgument) => Promise<void>;

export class Server {
  constructor(private msgCallbackFn: (options: ServerMessageCallbackArgument) => Promise<void>, private server: ServerModel = new ServerModel()) {
    RoomService.msgCallBackFn = msgCallbackFn;
    ServerServices.initialingServer(this.server, this.msgCallbackFn);
  }

  public async postMessage(msgSyntax: string): Promise<void> {
    // Parse message syntax
    let [senderUsername, password, roomName, message]: string[] = parseMessage(msgSyntax);
    senderUsername = senderUsername || 'ANONYMOUS';

    let room: Room | undefined = this.server.getRoom(roomName);
    let senderUser: User | undefined = User.isUserExistOnServer(senderUsername);

    // Check is command message
    let command = new Command(this.server, room, senderUser);
    if (command.isCommandExist(message, senderUser === undefined ? senderUsername : senderUser.userName, password)) return;

    // Get room
    if (room === undefined) {
      const roomErrorMsg = new PostRoomError();
      roomErrorMsg.execute({
        room: room!,
        user: senderUser!,
        msgCallbackFn: this.msgCallbackFn,
      });
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
      const userJoinMsg = new PostJoinUser();
      userJoinMsg.execute({ parameter: [senderUser.userName], room: room, authenticated: UserService.authentications(senderUser, password) });
    }

    const postMsg = new PostSendMessage();
    postMsg.execute({ parameter: [message], room: room, user: senderUser, authenticated: UserService.authentications(senderUser, password) });
  }

  public async waitForServerIdle(): Promise<void> {
    const pollingInterval = 500;
    let serverStatus = await ServerServices.refreshServerStatus();

    while (!serverStatus.idle) {
      let serverStatus = await ServerServices.refreshServerStatus();

      if (serverStatus.idle) {
        // Server is idle, break out of the loop
        return;
      }

      // Server is not idle, wait for the polling interval before checking again
      await wait(pollingInterval);
    }
  }
}
