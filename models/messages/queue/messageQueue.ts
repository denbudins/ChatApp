import { Message } from '../message';
import { User } from '../../users';
import { Room } from '../../room';
import { ServerMessageCallback } from '../../../server/server';
import { ServerServices } from '../../../services/serverService';

export class MessageQueue {
  private _queue: Message[] = [];
  private _processing: boolean = false;

  constructor(public room: Room, public user: User, private msgCallbackFn: ServerMessageCallback) {}

  public addMessageToQueue(msg: Message) {
    // Clone message and sender to prevent edits post send
    const msgClone = new Message(msg.text);
    msgClone.sender = new User(msg.sender.userName);
    // Add to queue
    this._queue.push(msgClone);
    // Trigger queue processing
    this.processQueue();
  }

  private async processQueue() {
    if (this._processing) {
      await ServerServices.refreshServerStatus();
      return;
    }

    this._processing = true;
    while (this._queue.length) {
      const msg = this._queue[0]!;
      await this.msgCallbackFn({ room: this.room, recipient: this.user, sender: msg.sender, msg: msg });
      await ServerServices.refreshServerStatus();
      this._queue.shift()!;
    }
    this._processing = false;
    await ServerServices.refreshServerStatus();
  }

  public getQueueLength(): number {
    return this._queue.length;
  }
}
