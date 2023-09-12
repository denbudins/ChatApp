import { Room } from '../models/room';
import { Message } from '../models/message';
import { User } from '../models/users';
import { splitOnRandomPieces } from '../utils/utils';

export class Server {
  constructor(public state: Room[], private msgCallbackFn: (...args: any[]) => Promise<undefined>) {}

  public MyMessagesServices(msg: string): void {
    let newMesseg: string[] = this.paresMessage(msg);
    let room: Room | undefined = this.state.find(({ id }) => id === newMesseg[2]);
    if (room === undefined) {
      room = new Room(newMesseg[2], [], []);
      this.state.push(room);
      let msgToSend: string = `"${newMesseg[0]}" joined the room`;
      room.messages.push(new Message(undefined, msgToSend, undefined, new Date()));
      room.usersInRoom.push(new User(newMesseg[0]));
      this.sendMessageToAllUsers(room, true, undefined, msgToSend);
    } else {
      if (room.usersInRoom.find(({ userName }) => userName === newMesseg[0]) === undefined) {
        room.usersInRoom.push(new User(newMesseg[0]));
        let msgToSend: string = `"${newMesseg[0]}" joined the room`;
        room.messages.push(new Message(undefined, `"${newMesseg[0]}" joined the room`, undefined, new Date()));
        this.sendMessageToAllUsers(room, true, undefined, msgToSend);
      }
    }
    this.sendMessageToAllUsers(room, false, newMesseg[1], newMesseg[3]);
    room.messages.push(new Message(newMesseg[1], newMesseg[3], new User(newMesseg[0]), new Date()));
  }

  public async sendMessageToAllUsers(room: Room, serverPost: boolean, sender: string | undefined, msg: string) {
    for (const user of room.usersInRoom) {
      await this.msgCallbackFn(serverPost, user.userName!, room.id, sender, msg);
    }
  }

  private paresMessage(inputMessege: string): string[] {
    let paresedArray: string[] = splitOnRandomPieces(inputMessege, ' ', 2);
    paresedArray = [...splitOnRandomPieces(paresedArray[0], '@', 2), paresedArray[1]];
    paresedArray = [...splitOnRandomPieces(paresedArray[0], ':', 2), paresedArray[1], paresedArray[2]];
    return paresedArray;
  }
}
