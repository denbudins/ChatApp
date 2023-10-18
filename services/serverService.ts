import { Server } from '../models/server';
import { User } from '../models/users';
import { Message } from '../models/messages/message';

import { PostMessage, PostUserCreate, PostUserRename } from '../command/post/postCommand';
import { ServerMessageCallback } from '../server/server';

export class ServerServices {
  private static server: Server;
  public static msgCallBackFn: ServerMessageCallback;

  public static initialingServer(server: Server, msgCallBackFn: ServerMessageCallback) {
    ServerServices.server = server;
    ServerServices.msgCallBackFn = msgCallBackFn;
  }

  public renameUserInAllRooms(newUserName: string, sender: User) {
    const rooms = ServerServices.server.getRooms();
    if (sender !== undefined) {
      for (const room of rooms) {
        if (room.isUserExist(sender.userName)) {
          const msgText: string = `"${sender.userName}" changed username to ${newUserName}`;
          const postRename = new PostUserRename();
          postRename.execute({ parameter: [msgText], room: room, user: sender });
        }
      }
      sender.userName = newUserName;
    }
  }

  public sendListOfAllRooms(recipient: User): Message | undefined {
    try {
      const listOfUserRoom = ServerServices.server.getRoomsByUser(recipient.userName);
      let msgText = `List of rooms where user ${recipient.userName} is allowed to post: \n`;
      for (const room of listOfUserRoom) {
        msgText += `uuid: ${room.uuid} name:${room.name}\n`;
      }
      return new Message(msgText.trim());
    } catch (err) {
      return undefined;
    }
  }

  public sendMsgNewUser(user: User): void {
    const createdNewRoom = new PostUserCreate();
    createdNewRoom.execute({ room: undefined, user, msgCallbackFn: ServerServices.msgCallBackFn });
  }

  public sendMsg(user: User, msg: Message): void {
    const postMsg = new PostMessage();
    postMsg.execute({ room: undefined, user, msg, msgCallbackFn: ServerServices.msgCallBackFn });
  }

  public static async refreshServerStatus(): Promise<{ idle: boolean; queueLength: number }> {
    // Update queue length
    let queueLength: number = 0;
    for (const room of ServerServices.server.serverRooms) {
      for (const queue of room.queues) {
        queueLength += queue.getQueueLength();
      }
    }
    ServerServices.server.serverStatus.queueLength = queueLength;

    // Update idle status based on queue length
    ServerServices.server.serverStatus.idle = queueLength === 0;

    return new Promise(resolve => {
      resolve(ServerServices.server.serverStatus);
    });
  }
}

export const serverService = new ServerServices();
