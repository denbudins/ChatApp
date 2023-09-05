import { Room } from './models/room';

export function outputMessages(roomsArray: Room[]): string {
  let outputText: string = '';
  for (const room of roomsArray) {
    outputText += '\nRoom ' + room.id + ' messages: \n\n';
    for (const message of room.messages) {
      outputText += message.message + '\n';
    }
  }

  return outputText;
}
