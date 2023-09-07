import { Room } from './models/room';
import { Message } from './models/message';

export function MyMessagesServices(inputMesseges: string[]): Room[] {
  let allRooms: Room[] = [];
  for (const messeg of inputMesseges) {
    let newMesseg: string[] = paresMessage(messeg);
    let room: Room | undefined = allRooms.find(({ id }) => id === newMesseg[2]);
    if (room === undefined) {
      room = new Room(newMesseg[2], []);
      allRooms.push(room);
    }
    room.messages.push(new Message(newMesseg[1], newMesseg[3], newMesseg[0], new Date()));
  }
  return allRooms;
}

function paresMessage(inputMessege: string): string[] {
  let paresedArray: string[] = splitOnRandomPieces(inputMessege, 2, ' ');
  paresedArray = [...splitOnRandomPieces(paresedArray[0], 2, '@'), paresedArray[1]];
  paresedArray = [...splitOnRandomPieces(paresedArray[0], 2, ':'), paresedArray[1], paresedArray[2]];
  return paresedArray;
}

function splitOnRandomPieces(stringToSplit: string, numberToSplit: number, characterForSplit: string): string[] {
  let splittedArray: string[] = stringToSplit.split(characterForSplit);
  if (splittedArray.length < numberToSplit) {
    const rowsForAdd: number = numberToSplit - splittedArray.length;
    for (let index: number = 0; index < rowsForAdd; index++) {
      splittedArray.push('');
    }
  } else if (splittedArray.length > numberToSplit) {
    const indexToPut: number = numberToSplit - 1;
    let mergedString: string = '';
    for (let index: number = indexToPut; index < splittedArray.length; index++) {
      mergedString += `${splittedArray[index]} `;
    }
    splittedArray = splittedArray.slice(0, indexToPut);
    splittedArray[indexToPut] = mergedString.trim();
  }
  return splittedArray;
}
