import { Room } from './models/room';
import { Message } from './models/message';

export function MyMessagesServices(inputMesseges: string[]): Room[] {
  let allRooms: Room[] = [];
  for (const messeg of inputMesseges) {
    let newMesseg: string[] = paresMessage(messeg);
    let room: Room | undefined = allRooms.find(({ id }) => id === newMesseg[1]);
    if (room !== undefined) {
      room.messages.push(new Message(newMesseg[2]));
    } else {
      let newRoom: Room = new Room(newMesseg[0], newMesseg[1], [new Message(newMesseg[2])]);
      allRooms.push(newRoom);
    }
  }
  return allRooms;
}

function paresMessage(inputMessege: string): string[] {
  const findingRegExp: RegExp = /(?<=^\S+)\s/gm;
  let paresedArray: string[] = [];
  paresedArray = inputMessege.split(findingRegExp);
  paresedArray = [...paresedArray[0].split('@'), paresedArray[1]];
  return paresedArray;
}
