import { Message } from './message';
import { User } from './users';
import { MessageQueue } from './messageQueue';
import { ServerMessageCallback } from '../server/server';

export class Room {
  private queues: MessageQueue[] = [];
  private messages: Message[] = [];

  constructor(public id: string, private msgCallbackFn: ServerMessageCallback) {}

  public isUserExist(userForFind: string): boolean {
    if (this.queues.find(({ user }) => user.userName === userForFind)) return true;
    else return false;
  }

  public registerUser(user: User): void {
    this.queues.push(new MessageQueue(this, user, this.msgCallbackFn));
  }

  public postMessage(msg: Message): void {
    this.messages.push(msg);
    for (const user of this.queues) {
      // Add the message to a queue
      user.addMessageToQueue(this, msg);
    }
  }
}
