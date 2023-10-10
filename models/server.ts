import { Room } from '../models/room';

export class Server {
  constructor(public serverRooms: Room[] = []) {}

  public addNewRoom(room: Room) {
    this.serverRooms.push(room);
  }

  public getRooms(): Room[] {
    return this.serverRooms;
  }

  public getRoom(roomName: string): Room | undefined {
    return this.serverRooms.find(({ uuid, name }) => uuid === roomName || name === roomName);
  }

  public getRoomsByUser(userName: string) {
    return this.serverRooms.filter(room => room.isUserExist(userName) === true);
  }
}
