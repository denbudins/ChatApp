import { CommandArgument, CommandInterface } from '../interfaces/command';

import { Message } from '../../models/messages/message';
import { ServerUser } from '../../models/users';
import { CommandList } from '../commandsList';

export class PostJoinUser implements CommandInterface {
  public keyword: string = 'post join';

  public execute({ parameter, room }: CommandArgument): boolean {
    let msgText: string;
    // Post user joined
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
    room!.postMessageToAllUsers(new Message(parameter![0], user));
    return true;
  }
}

export class PostRoomCreate implements CommandInterface {
  public keyword: string = 'post room created';

  public execute({ room, user }: CommandArgument): boolean {
    let userMsgQueue = room!.registerUser(user!);
    room!.postMessageToUser(new Message(`Room ${room?.name} is created and have status "${room?.status}"`, new ServerUser()), userMsgQueue);
    return true;
  }
}

export class PostUserCreate implements CommandInterface {
  public keyword: string = 'post user created';

  public execute({ room, user, msgCallbackFn }: CommandArgument): boolean {
    let msgText: string;
    const serverUser = new ServerUser();
    msgText = `New ${user?.isUserRegister === true ? 'register' : 'non register'} user is created whit username ${user?.userName}`;
    msgCallbackFn!({ room: room!, recipient: user!, sender: serverUser, msg: new Message(msgText) });
    return true;
  }
}

export class PostMessage implements CommandInterface {
  public keyword: string = 'post message';

  public execute({ room, user, msg, msgCallbackFn }: CommandArgument): boolean {
    let msgText: string;
    const serverUser = new ServerUser();
    msgCallbackFn!({ room: room!, recipient: user!, sender: serverUser, msg: msg! });
    return true;
  }
}

CommandList.addCommand(new PostJoinUser());
CommandList.addCommand(new PostSendMessage());
CommandList.addCommand(new PostRoomError());
CommandList.addCommand(new PostUserRename());
CommandList.addCommand(new PostRoomCreate());
CommandList.addCommand(new PostUserCreate());
CommandList.addCommand(new PostMessage());
