import { User } from './users';

export class Message {
  public time: Date = new Date();

  constructor(public text: string, public sender?: User) {}
}
