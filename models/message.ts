import { User } from './users';

export class Message {
  constructor(public anything: string | undefined, public message: string, public user: User | undefined, public messageTime: Date) {}
}
