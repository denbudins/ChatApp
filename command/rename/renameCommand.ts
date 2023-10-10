import { ServerServices } from '../../services/serverService';
import { CommandList } from '../commandsList';
import { CommandArgument, CommandInterface } from '../interfaces/command';

export class RenameSelf implements CommandInterface {
  public keyword: string = 'rename self';

  public execute({ parameter, server, user }: CommandArgument): boolean {
    ServerServices.renameUserInAllRooms(server!, parameter![0], user!);
    return true;
  }
}

export class RenameRoom implements CommandInterface {
  public keyword: string = 'rename room';

  public execute({ parameter, room }: CommandArgument): boolean {
    room!.renameRoomName(parameter![0]);
    return true;
  }
}

CommandList.addCommand(new RenameSelf());
CommandList.addCommand(new RenameRoom());
