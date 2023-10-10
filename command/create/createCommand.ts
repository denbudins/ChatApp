import { CommandArgument, CommandInterface } from '../interfaces/command';

import { CommandList } from '../commandsList';

import { UserService } from '../../services/userService';
import { RoomService } from '../../services/roomService';

export class CreateUser implements CommandInterface {
  public keyword: string = 'create user';

  public execute({ parameter }: CommandArgument): boolean {
    const [userName, password] = parameter!;
    if (password !== '' && password !== undefined) UserService.createNewRegisterUser(userName, password);
    else UserService.creatingNonRegisterUser(userName);
    return true;
  }
}

export class CreateRoom implements CommandInterface {
  public keyword: string = 'create room';

  public execute({ parameter, server, authenticated }: CommandArgument): boolean {
    const [roomName, roomStatus]: string[] = parameter!;
    if (roomStatus === 'non-open' && !authenticated) return false;
    const newRoom = RoomService.creatingNewRoom(roomName, roomStatus);
    server!.addNewRoom(newRoom);
    return true;
  }
}

CommandList.addCommand(new CreateUser());
CommandList.addCommand(new CreateRoom());
