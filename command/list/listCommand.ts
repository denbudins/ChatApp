import { CommandArgument, CommandInterface } from '../interfaces/command';

import { ServerUser } from '../../models/users';
import { ServerServices } from '../../services/serverService';

export class ListCommands implements CommandInterface {
  public keyword: string = 'list';

  public execute({ command, server, room, user, authenticated, msgCallbackFn }: CommandArgument): boolean {
    switch (command) {
      case 'rooms':
        const serverUser = new ServerUser();
        const message = ServerServices.sendListOfAllRooms(server, user);
        if (message === undefined) break;
        msgCallbackFn({ room: room, recipient: user, sender: serverUser, msg: message });
        break;
      case 'users':
        room.sendListOfUser(user);
        break;
      case 'messages':
        if (room.status === 'non-open' && !authenticated) break;
        room.resendAllMessagesToUser(user);
        break;
      default:
        return false;
    }
    return true;
  }
}
