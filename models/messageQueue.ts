import { Message } from './message';
import { User } from './users';
import { Room } from './room';
import { ServerMessageCallback } from '../server/server';

export class MessageQueue {
  private _queue: Message[] = [];
  private _processing: boolean = false;

  constructor(public room: Room, public user: User, private msgCallbackFn: ServerMessageCallback) {}

  public addMessageToQueue(room: Room, msg: Message) {
    // Add to queue
    this._queue.push(msg);
    // Trigger queue processing
    this.processQueue();
  }

  private async processQueue() {
    if (this._processing) return;

    this._processing = true;
    while (this._queue.length) {
      const msg = this._queue.shift()!;
      await this.msgCallbackFn({ room: this.room, recipient: this.user, sender: msg.sender, msg: msg });
    }
    this._processing = false;
  }
}
