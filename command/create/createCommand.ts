import { CommandArgument, CommandInterface } from '../interfaces/command';

import { CommandList } from '../commandsList';

import { UserService } from '../../services/userService';
import { RoomService } from '../../services/roomService';
import { PostRoomCreate } from '../post/postCommand';
import { User } from '../../models/users';
import { serverService } from '../../services/serverService';

export class CreateUser implements CommandInterface {
  public keyword: string = 'create user';

  public execute({ parameter }: CommandArgument): boolean {
    const [userName, password] = parameter!;
    let newUser: User;
    if (password !== '' && password !== undefined) newUser = UserService.createNewRegisterUser(userName, password);
    else newUser = UserService.creatingNonRegisterUser(userName);
    serverService.sendMsgNewUser(newUser);
    return true;
  }
}

export class CreateRoom implements CommandInterface {
  public keyword: string = 'create room';

  public execute({ parameter, server, user, authenticated, msgCallbackFn }: CommandArgument): boolean {
    const [roomName, roomStatus]: string[] = parameter!;
    if (roomStatus === 'non-open' && !authenticated) return false;
    const newRoom = RoomService.creatingNewRoom(roomName, roomStatus);
    server!.addNewRoom(newRoom);
    const createdNewRoom = new PostRoomCreate();
    createdNewRoom.execute({ room: newRoom, user, msgCallbackFn });
    return true;
  }
}

CommandList.addCommand(new CreateUser());
CommandList.addCommand(new CreateRoom());
