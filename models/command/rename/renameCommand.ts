import { CommandInterface } from '../../../interfaces/command';
import { Room } from '../../room';
import { User } from '../../users';
import { Server } from '../../../server/server';
import { splitOnRandomPieces } from '../../../utils/utils';

export class RenameCommands implements CommandInterface {
  public keyword: string = '/rename';

  public execute(commandParameters: string, server: Server, room: Room, user: User): boolean {
    let [commandName, parameter]: string[] = splitOnRandomPieces(commandParameters, ' ', 2);
    switch (commandName) {
      case 'self':
        server.renameUserInAllRooms(parameter, user);
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
