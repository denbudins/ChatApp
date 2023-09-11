import { Room } from './models/room';
import { Message } from './models/message';
import { postToServer, outputMessages } from './outputFunctions';

export async function msgCallbackFn(state: Room[], msg: string) {
  await wait(500 + 500 * Math.random()).then(() => {
    MyMessagesServices(state, msg);
  });
}

function MyMessagesServices(state: Room[], inputMesseges: string): void {
  postToServer(inputMesseges);
  let newMesseg: string[] = paresMessage(inputMesseges);
  let room: Room | undefined = state.find(({ id }) => id === newMesseg[2]);
  if (room === undefined) {
    room = new Room(newMesseg[2], []);
    state.push(room);
    room.messages.push(new Message(undefined, `"${newMesseg[0]}" joined the room`, 'SERVER', new Date()));
    outputMessages(`Announcement in room "${newMesseg[2]}"`, newMesseg[0], `"${newMesseg[0]}" joined the room`);
    outputMessages(`"${newMesseg[0]}" posted in "${newMesseg[2]}"`, newMesseg[0], newMesseg[3]);
  } else {
    const uniqueUserNames: (string | undefined)[] = [
      ...new Set(room.messages.filter(message => message.userName !== 'SERVER').map(message => message.userName)),
    ];
    if (room.messages.find(({ userName }) => userName === newMesseg[0]) === undefined) {
      uniqueUserNames.push(newMesseg[0]);
      room.messages.push(new Message(undefined, `"${newMesseg[0]}" joined the room`, 'SERVER', new Date()));
      for (const user of uniqueUserNames) {
        outputMessages(`Announcement in room "${newMesseg[2]}"`, user!, `"${newMesseg[0]}" joined the room`);
      }
    }
    for (const user of uniqueUserNames) {
      outputMessages(`"${newMesseg[0]}" posted in "${newMesseg[2]}"`, user!, newMesseg[3]);
    }
  }
  room.messages.push(new Message(newMesseg[1], newMesseg[3], newMesseg[0], new Date()));
}

function paresMessage(inputMessege: string): string[] {
  let paresedArray: string[] = splitOnRandomPieces(inputMessege, ' ', 2);
  paresedArray = [...splitOnRandomPieces(paresedArray[0], '@', 2), paresedArray[1]];
  paresedArray = [...splitOnRandomPieces(paresedArray[0], ':', 2), paresedArray[1], paresedArray[2]];
  return paresedArray;
}

function splitOnRandomPieces(stringToSplit: string, separator: string, limit: number): string[] {
  let splittedArray: string[] = stringToSplit.split(separator);
  if (splittedArray.length < limit) {
    const rowsForAdd: number = limit - splittedArray.length;
    for (let index: number = 0; index < rowsForAdd; index++) {
      splittedArray.push('');
    }
  } else if (splittedArray.length > limit) {
    const indexToPut: number = limit - 1;
    let mergedString: string = '';
    for (let index: number = indexToPut; index < splittedArray.length; index++) {
      mergedString += `${splittedArray[index]} `;
    }
    splittedArray = splittedArray.slice(0, indexToPut);
    splittedArray[indexToPut] = mergedString.trim();
  }
  return splittedArray;
}

async function wait(interval_in_ms: number): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(undefined);
    }, interval_in_ms);
  });
}
