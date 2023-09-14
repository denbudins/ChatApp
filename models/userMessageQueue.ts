import { Message } from './message';
import { User } from './users';
import { Room } from './room';
import { ServerMessageCallback } from '../server/server';

export class userMessageQueue {
  public messages: Message[] = [];
  public messagesSendingInProgress: boolean = false;

  constructor(public user: User) {}

  public addMessageToQueue(room: Room, msg: Message, msgCallbackFn: (options: ServerMessageCallback) => Promise<void>) {
    this.messages.push(msg);
    //Started sending message to user
    if (!this.messagesSendingInProgress) {
      this.sendMessage(room, msg, msgCallbackFn);
    }
  }

  public removeMessageFromQueue() {
    this.messages.shift();
  }

  private sendMessage(room: Room, msg: Message, msgCallbackFn: (options: ServerMessageCallback) => Promise<void>) {
    if (!this.messagesSendingInProgress) {
      this.messagesSendingInProgress = true;
      msgCallbackFn({ room, recipient: this.user, sender: msg.sender, msg: msg }).then(() => {
        this.removeMessageFromQueue();
        this.messagesSendingInProgress = false;
        if (this.messages.length > 0) {
          this.sendMessage(room, this.messages[0], msgCallbackFn);
        }
      });
    }
  }
}
