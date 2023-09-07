import { Message } from './message';

export class Room {
  constructor(public id: string, public messages: Message[]) {}
}
