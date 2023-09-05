import { Message } from './message';

export class Room {
  constructor(public anything: string, public id: string, public messages: Message[]) {}
}
