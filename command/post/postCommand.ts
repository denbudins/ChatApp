import { CommandArgument, CommandInterface } from '../interfaces/command';

import { Message } from '../../models/messages/message';
import { ServerUser } from '../../models/users';
import { CommandList } from '../commandsList';

export class PostJoinUser implements CommandInterface {
  public keyword: string = 'post join';

  public execute({ parameter, room, authenticated }: CommandArgument): boolean {
    let msgText: string;
    // Post user joined
    if (room!.status === 'non-open' && !authenticated) return false;
    msgText = `"${parameter}" joined the room`;
    room!.postMessageToAllUsers(new Message(msgText));
    return true;
  }
}

export class PostSendMessage implements CommandInterface {
  public keyword: string = 'post send';

  public execute({ parameter, room, user, authenticated }: CommandArgument): boolean {
    if (room!.status === 'non-open' && !authenticated) return false;
    room!.postMessageToAllUsers(new Message(parameter![0], user));
    return true;
  }
}

export class PostRoomError implements CommandInterface {
  public keyword: string = 'post error';

  public execute({ room, user, msgCallbackFn }: CommandArgument): boolean {
    let msgText: string;
    const serverUser = new ServerUser();
    msgText = `Room does not exist!`;
    msgCallbackFn!({ room: room!, recipient: user!, sender: serverUser, msg: new Message(msgText) });
    return true;
  }
}

export class PostUserRename implements CommandInterface {
  public keyword: string = 'post rename';

  public execute({ parameter, room, user }: CommandArgument): boolean {
    console.log(`parameter: ${parameter![0]}, sender: ${user}, room: ${room}`.bgRed);
    room!.postMessageToAllUsers(new Message(parameter![0], user));
    return true;
  }
}

CommandList.addCommand(new PostJoinUser());
CommandList.addCommand(new PostSendMessage());
CommandList.addCommand(new PostRoomError());
CommandList.addCommand(new PostUserRename());
