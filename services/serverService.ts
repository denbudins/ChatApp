import { User } from '../models/users';
import { Room } from '../models/room';
import { Command } from '../models/command/command';
import { Message } from '../models/messages/message';

import { ServerMessageCallback } from '../server/server';

export class ServerServices {
  constructor(private serverRooms: Room[] = []) {}

  public addNewRoom(room: Room) {
    this.serverRooms.push(room);
  }

  public getRoom(roomName: string): Room | undefined {
    return this.serverRooms.find(({ uuid, name }) => uuid === roomName || name === roomName);
  }

  public renameUserInAllRooms(newUserName: string, sender: User, msgCallbackFn: ServerMessageCallback) {
    if (sender !== undefined) {
      for (const room of this.serverRooms) {
        if (room.isUserExist(sender.userName)) {
          const command = new Command(this, room, sender, msgCallbackFn);
          const msgText: string = `"${sender.userName}" changed username to ${newUserName}`;
          command.runCommand('post', 'user rename', msgText, sender.password);
        }
      }
      sender.userName = newUserName;
    }
  }

  public sendListOfAllRooms(recipient: User): Message | undefined {
    try {
      const listOfUserRoom = this.serverRooms.filter(room => room.isUserExist(recipient.userName) === true);
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
