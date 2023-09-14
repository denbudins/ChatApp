import { Room } from '../models/room';
import { Message } from '../models/message';
import { User } from '../models/users';
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
    let room: Room | undefined = this.rooms.find(({ id }) => id === roomId);
    if (room === undefined) {
      room = new Room(roomId, this.msgCallbackFn);
      this.rooms.push(room);
    }

    // Check if user joined room
    let senderUser = User.isUserExistOnServer(senderUsername); // TODO: Check all users that ever existed on the entire server!
    if (senderUser === undefined) {
      // Create new user
      senderUser = new User(senderUsername);
    }

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
}
