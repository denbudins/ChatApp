import { Room } from '../models/room';

import { ServerMessageCallback } from '../server/server';

export class RoomService {
  public static msgCallBackFn: ServerMessageCallback;

  static creatingNewRoom(roomName: string, roomStatus: string) {
    let newRoom: Room = new Room(roomName, this.msgCallBackFn);
    if (roomStatus === 'non-open') newRoom.status = 'non-open';
    return newRoom;
  }
}
