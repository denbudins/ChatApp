import { serverService } from '../../services/serverService';
import { CommandList } from '../commandsList';
import { CommandArgument, CommandInterface } from '../interfaces/command';

export class RenameSelf implements CommandInterface {
  public keyword: string = 'rename self';

  public execute({ parameter, user }: CommandArgument): boolean {
    serverService.renameUserInAllRooms(parameter![0], user!);
    return true;
  }
}

export class RenameRoom implements CommandInterface {
  public keyword: string = 'rename room';

  public execute({ parameter, room, authenticated }: CommandArgument): boolean {
    if (room === undefined) return true;
    if (room?.status === 'non-open' && !authenticated) return true;
    room!.renameRoomName(parameter![0]);
    return true;
  }
}

CommandList.addCommand(new RenameSelf());
CommandList.addCommand(new RenameRoom());
