import { Server } from '../models/server';
import { User } from '../models/users';
import { Command } from '../command/command';
import { Message } from '../models/messages/message';

import { ServerMessageCallback } from '../server/server';

export class ServerServices {
  public static renameUserInAllRooms(server: Server, newUserName: string, sender: User, msgCallbackFn: ServerMessageCallback) {
    const rooms = server.getRooms();
    if (sender !== undefined) {
      for (const room of rooms) {
        if (room.isUserExist(sender.userName)) {
          const command = new Command(server, room, sender, msgCallbackFn);
          const msgText: string = `"${sender.userName}" changed username to ${newUserName}`;
          command.runCommand('post', 'user rename', msgText, sender.password);
        }
      }
      sender.userName = newUserName;
    }
  }

  public static sendListOfAllRooms(server: Server, recipient: User): Message | undefined {
    try {
      const listOfUserRoom = server.getRoomsByUser(recipient.userName);
      let msgText = `List of rooms where user ${recipient.userName} is allowed to post: \n`;
      for (const room of listOfUserRoom) {
        msgText += `uuid: ${room.uuid} name:${room.name}\n`;
      }
      return new Message(msgText.trim());
    } catch (err) {
      return undefined;
    }
  }
}
