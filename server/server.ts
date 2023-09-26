import { Room } from '../models/room';
import { Message } from '../models/messages/message';
import { User } from '../models/users';
import { Command } from '../models/command/command';
import { splitOnRandomPieces } from '../utils/utils';

export type ServerMessageCallbackArgument = { room: Room; recipient: User; sender?: User; msg: Message };
export type ServerMessageCallback = (options: ServerMessageCallbackArgument) => Promise<void>;

export class Server {
  private rooms: Room[] = [];

  constructor(private msgCallbackFn: (options: ServerMessageCallbackArgument) => Promise<void>) {}

  public async postMessage(msgSyntax: string): Promise<void> {
    // Parse message syntax
    let [senderUsername, _, roomId, message]: string[] = this.parseMessage(msgSyntax);
    senderUsername = senderUsername || 'ANONYMOUS';

    // Get room
    let room: Room | undefined = this.rooms.find(({ uuid, id }) => uuid === roomId || id === roomId);
    if (room === undefined) {
      room = new Room(roomId, this.msgCallbackFn);
      this.rooms.push(room);
    }

    // Check if user joined room
    let senderUser = User.isUserExistOnServer(senderUsername);
    if (senderUser === undefined) {
      // Create new user
      senderUser = new User(senderUsername);
    }

    // Check is command message
    let command = new Command(this, room, senderUser);
    if (command.isCommandExist(message)) return;

    // Check if user newly joined
    if (!room.isUserExist(senderUser.userName)) {
      // Add newly joined user to room
      room.registerUser(senderUser);
      // Post user joined
      let msgText: string = `"${senderUsername}" joined the room`;
      room.postMessage(new Message(msgText));
    }

    // Post message
    room.postMessage(new Message(message, senderUser));
  }

  private parseMessage(inputMessage: string): string[] {
    let parsedArray: string[] = splitOnRandomPieces(inputMessage, ' ', 2);
    parsedArray = [...splitOnRandomPieces(parsedArray[0], '@', 2), parsedArray[1]];
    parsedArray = [...splitOnRandomPieces(parsedArray[0], ':', 2), parsedArray[1], parsedArray[2]];
    return parsedArray;
  }

  public sendListOfAllRooms(currentRoom: Room, recipient: User) {
    let userQueue = currentRoom.findUserQueue(recipient);
    let msgText = `List rooms on server: \n`;
    for (const room of this.rooms) {
      msgText += `uuid: ${room.uuid} name:${room.id}\n`;
    }
    let msg = new Message(msgText.trim());
    userQueue.addMessageToQueue(msg);
  }

  public renameUserInAllRooms(newUserName: string, sender: User) {
    for (const room of this.rooms) {
      if (room.isUserExist(sender.userName)) {
        let msgText: string = `"${sender.userName}" changed username to ${newUserName}`;
        room.postMessage(new Message(msgText));
      }
    }
    sender.userName = newUserName;
  }
}
