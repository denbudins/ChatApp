import { CommandArgument, CommandInterface } from '../interfaces/command';

import { ServerUser } from '../../models/users';
import { ServerServices } from '../../services/serverService';
import { CommandList } from '../commandsList';

export class ListRooms implements CommandInterface {
  public keyword: string = 'list rooms';

  public execute({ server, room, user, msgCallbackFn }: CommandArgument): boolean {
    const serverUser = new ServerUser();
    const message = ServerServices.sendListOfAllRooms(server!, user!);
    if (message === undefined) msgCallbackFn!({ room: room!, recipient: user!, sender: serverUser, msg: message! });
    return true;
  }
}

export class ListMessages implements CommandInterface {
  public keyword: string = 'list messages';

  public execute({ room, user, authenticated }: CommandArgument): boolean {
    if (room!.status === 'non-open' && !authenticated) return false;
    room!.resendAllMessagesToUser(user!);
    return true;
  }
}

export class ListUsers implements CommandInterface {
  public keyword: string = 'list users';

  public execute({ room, user }: CommandArgument): boolean {
    room!.sendListOfUser(user!);
    return true;
  }
}

CommandList.addCommand(new ListRooms());
CommandList.addCommand(new ListMessages());
CommandList.addCommand(new ListUsers());
