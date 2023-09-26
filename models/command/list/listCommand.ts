import { CommandInterface } from '../../../interfaces/command';
import { Room } from '../../room';
import { User } from '../../users';
import { Server } from '../../../server/server';
import { splitOnRandomPieces } from '../../../utils/utils';

export class ListCommands implements CommandInterface {
  public keyword: string = '/list';

  public execute(commandParameters: string, server: Server, room: Room, user: User): boolean {
    let [commandName, _]: string[] = splitOnRandomPieces(commandParameters, ' ', 2);
    let isCommandExecute = false;
    switch (commandName) {
      case 'rooms':
        server.sendListOfAllRooms(room, user);
        isCommandExecute = true;
        break;
      case 'users':
        room.sendListOfUser(user);
        isCommandExecute = true;
        break;
      case 'messages':
        room.resendAllMessagesToUser(user);
        isCommandExecute = true;
        break;
      default:
        break;
    }
    return isCommandExecute;
  }
}
