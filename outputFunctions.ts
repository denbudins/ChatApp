import { Room } from './models/room';

export function postToServer(msg: string): void {
  console.log(`POSTing message: "${msg}"`);
}

export function outputMessages(typeOfMessage: string, userName: string, msg: string): void {
  /*let outputText: string = '';
  outputText += `\nRoom  ${room.id}  messages: \n\n`;
  for (const message of room.messages) {
    outputText += `[${message.messageTime.toLocaleDateString()} ${message.messageTime.toLocaleTimeString()}] ${message.userName}: ${message.message} \n`;
  }*/

  console.log(`To "${userName}" ::: ${typeOfMessage}: ${msg}`);
}
