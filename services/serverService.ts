import { Server } from '../models/server';
import { User } from '../models/users';
import { Message } from '../models/messages/message';

import { PostUserRename } from '../command/post/postCommand';

export class ServerServices {
  public static renameUserInAllRooms(server: Server, newUserName: string, sender: User) {
    const rooms = server.getRooms();
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
