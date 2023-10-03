import { Room } from '../models/room';

import { ServerMessageCallback } from '../server/server';

export class RoomService {
  static creatingNewRoom(roomName: string, roomStatus: string, msgCallbackFn: ServerMessageCallback) {
    let newRoom: Room = new Room(roomName, msgCallbackFn);
    if (roomStatus !== '') newRoom.status = roomStatus;
    return newRoom;
  }
}
