import { Message } from './message';
import { User } from './users';

export class Room {
  constructor(public id: string, public messages: Message[], public usersInRoom: User[]) {}
}
