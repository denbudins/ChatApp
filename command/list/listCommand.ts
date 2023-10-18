import { CommandArgument, CommandInterface } from '../interfaces/command';

import { ServerUser } from '../../models/users';
import { serverService } from '../../services/serverService';
import { CommandList } from '../commandsList';

export class ListRooms implements CommandInterface {
  public keyword: string = 'list rooms';

  public execute({ user }: CommandArgument): boolean {
    let message = serverService.sendListOfAllRooms(user!);
    if (message !== undefined) serverService.sendMsg(user!, message);
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
