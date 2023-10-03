import { CommandArgument, CommandInterface } from '../interfaces/command';

import { UserService } from '../../../services/userService';
import { RoomService } from '../../../services/roomService';

import { splitOnRandomPieces } from '../../../utils/utils';

export class CreateCommand implements CommandInterface {
  public keyword: string = 'create';

  public execute({ command, parameter, server, authenticated, msgCallbackFn }: CommandArgument): boolean {
    switch (command) {
      case 'user':
        const [userName, password] = splitOnRandomPieces(parameter, ' ', 2);
        UserService.createNewRegisterUser(userName, password);
        break;
      case 'room':
        const [roomName, roomStatus]: string[] = splitOnRandomPieces(parameter, ' ', 2);
        if (roomStatus === 'non-open' && !authenticated) break;
        const newRoom = RoomService.creatingNewRoom(roomName, roomStatus, msgCallbackFn);
        server.addNewRoom(newRoom);
        break;
      default:
        return false;
    }
    return true;
  }
}
