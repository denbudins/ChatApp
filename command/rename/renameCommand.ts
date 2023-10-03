import { ServerServices } from '../../services/serverService';
import { CommandArgument, CommandInterface } from '../interfaces/command';

export class RenameCommands implements CommandInterface {
  public keyword: string = 'rename';

  public execute({ command, parameter, server, room, user, authenticated, msgCallbackFn }: CommandArgument): boolean {
    switch (command) {
      case 'self':
        ServerServices.renameUserInAllRooms(server, parameter, user, msgCallbackFn);
        break;
      case 'room':
        room.renameRoomName(parameter);
        break;
      default:
        return false;
    }
    return true;
  }
}
