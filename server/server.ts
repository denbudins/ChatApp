import { Room } from '../models/room';
import { Message } from '../models/message';
import { User, ServerUser, AnonymousUser } from '../models/users';
import { splitOnRandomPieces } from '../utils/utils';

export type ServerMessageCallback = { room: Room; recipient: User; sender?: User; msg: Message };

const platformUser = new ServerUser(); // TODO: Make sure to register and use these users when appropriate
const anonymousUser = new AnonymousUser();

export class Server {
  private rooms: Room[] = [];

  constructor(private msgCallbackFn: (options: ServerMessageCallback) => Promise<void>) {}

  public async postMessage(msgSyntax: string): Promise<void> {
    // Parse message syntax
    let [senderUsername, _, roomId, message]: string[] = this.parseMessage(msgSyntax);

    // Get room
    let room: Room | undefined = this.rooms.find(({ id }) => id === roomId);
    if (room === undefined) {
      room = new Room(roomId);
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
      let msgToSend: string = `"${senderUsername}" joined the room`;
      this.sendMessageToRoom(room, msgToSend, platformUser);
    }

    // Post message
    this.sendMessageToRoom(room, message, senderUser);
  }

  private sendMessageToRoom(room: Room, msgText: string, sender?: User): void {
    const msg = new Message(msgText, sender);
    room.postMessage(msg, this.msgCallbackFn);
  }

  private parseMessage(inputMessage: string): string[] {
    let parsedArray: string[] = splitOnRandomPieces(inputMessage, ' ', 2);
    parsedArray = [...splitOnRandomPieces(parsedArray[0], '@', 2), parsedArray[1]];
    parsedArray = [...splitOnRandomPieces(parsedArray[0], ':', 2), parsedArray[1], parsedArray[2]];
    return parsedArray;
  }
}
