import { Message } from './message';
import { User } from './users';
import { userMessageQueue } from './userMessageQueue';
import { ServerMessageCallback } from '../server/server';

export class Room {
  public usersQueue: userMessageQueue[] = [];
  public messages: Message[] = [];
  public messageQueue: Promise<void>[] = [];

  public isUserExist(userForFind: string): boolean {
    if (this.usersQueue.find(({ user }) => user.userName === userForFind)) return true;
    else return false;
  }

  public registerUser(user: User): void {
    this.usersQueue.push(new userMessageQueue(user));
  }

  public postMessage(msg: Message, msgCallbackFn: (options: ServerMessageCallback) => Promise<void>): void {
    this.messages.push(msg);
    for (const user of this.usersQueue) {
      // Add the message to a queue
      user.addMessageToQueue(this, msg, msgCallbackFn);
    }
  }

  constructor(public id: string) {}
}
