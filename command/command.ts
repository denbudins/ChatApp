import '../command/create/createCommand';
import '../command/list/listCommand';
import '../command/post/postCommand';
import '../command/rename/renameCommand';

import { CommandList } from './commandsList';
import { Server } from '../models/server';
import { Room } from '../models/room';
import { User } from '../models/users';

import { UserService } from '../services/userService';

export class Command {
  constructor(private server: Server, private room: Room | undefined, public user: User | undefined) {}

  public isCommandExist(commandTxt: string, password: string | null): boolean {
    let parameterArray: string[] = commandTxt.split(' ');
    const command = `${parameterArray[0].substring(1) + ' ' + parameterArray[1]}`;
    let executeCommand = CommandList.commandList.find(commands => commands.keyword === command);
    if (executeCommand !== undefined) {
      // If command is execute return true
      if (
        executeCommand.execute({
          parameter: parameterArray.splice(2),
          server: this.server,
          room: this.room!,
          user: this.user!,
          authenticated: UserService.authentications(this.user!, password),
        })
      )
        return true;
    }
    return false;
  }
}
