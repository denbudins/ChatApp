import { CommandArgument, CommandInterface } from '../interfaces/command';

import { Message } from '../../models/messages/message';
import { ServerUser } from '../../models/users';

export class PostCommand implements CommandInterface {
  public keyword: string = 'post';

  public execute({ command, parameter, room, user, authenticated, msgCallbackFn }: CommandArgument): boolean {
    let msgText: string;

    switch (command) {
      case 'join user':
        // Post user joined
        if (room.status === 'non-open' && !authenticated) break;
        msgText = `"${parameter}" joined the room`;
        room.postMessageToAllUsers(new Message(msgText));
        break;
      case 'send message':
        if (room.status === 'non-open' && !authenticated) break;
        room.postMessageToAllUsers(new Message(parameter, user));
        break;
      case 'room error':
        const serverUser = new ServerUser();
        msgText = `Room does not exist!`;
        msgCallbackFn({ room: room, recipient: user, sender: serverUser, msg: new Message(msgText) });
        break;
      case 'user rename':
        room.postMessageToAllUsers(new Message(parameter, user));
        break;
      default:
        return false;
    }
    return true;
  }
}
