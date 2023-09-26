import { User, platformUser } from '../users';

export class Message {
  public time: Date = new Date();

  constructor(public text: string, public sender: User = platformUser) {}
}
