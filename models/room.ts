import { v4 } from 'uuid';
import { Message } from './messages/message';
import { User } from './users';
import { MessageQueue } from './messages/queue/messageQueue';
import { ServerMessageCallback } from '../server/server';

export class Room {
  public queues: MessageQueue[] = [];
  private messages: Message[] = [];
  public uuid: string;
  public status: 'open' | 'non-open';

  constructor(public name: string, private msgCallbackFn: ServerMessageCallback) {
    this.uuid = v4();
    this.status = 'open';
  }

  public isUserExist(userForFind: string): boolean {
    if (this.queues.find(({ user }) => user.userName === userForFind)) return true;
    else return false;
  }

  public registerUser(user: User): MessageQueue {
    let queue = new MessageQueue(this, user, this.msgCallbackFn);
    this.queues.push(queue);
    return queue;
  }

  public postMessageToAllUsers(msg: Message): void {
    this.messages.push(msg);
    for (const user of this.queues) {
      // Add the message to a queue
      user.addMessageToQueue(msg);
    }
  }

  public postMessageToUser(msg: Message, userQueue: MessageQueue): void {
    this.messages.push(msg);
    userQueue.addMessageToQueue(msg);
  }

  public resendAllMessagesToUser(recipient: User) {
    let userQueue = this.findUserQueue(recipient);
    for (const msg of this.messages) {
      userQueue.addMessageToQueue(msg);
    }
  }

  public sendListOfUser(recipient: User) {
    let msgText: string = `The following users are in room ${this.name}:\n`;
    const recipientHavePassword = recipient.password !== null ? true : false;
    for (const user of this.queues) {
      if (!recipientHavePassword) {
        if (user.user.password !== null) continue;
      }
      msgText += `uuid: ${user.user.uuid} username: ${user.user.userName}\n`;
    }
    let userQueue = this.findUserQueue(recipient);
    let msg = new Message(msgText.trim());
    userQueue.addMessageToQueue(msg);
  }

  public findUserQueue(userForFind: User): MessageQueue {
    let userQueue = this.queues.find(({ user }) => user === userForFind);
    if (!userQueue) {
      userQueue = this.registerUser(userForFind);
    }
    return userQueue;
  }

  public renameRoomName(newName: string) {
    let msg = new Message(`Room ${this.name} changed name to ${newName}`);
    this.postMessageToAllUsers(msg);
    this.name = newName;
  }
}
