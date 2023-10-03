import { CommandInterface } from './interfaces/command';

import { Server } from '../server';
import { Room } from '../room';
import { User } from '../users';

import { UserService } from '../../services/userService';

import { ListCommands } from './list/listCommand';
import { RenameCommands } from './rename/renameCommand';
import { CreateCommand } from './create/createCommand';
import { PostCommand } from './post/postCommand';

import { splitOnRandomPieces } from '../../utils/utils';

import { ServerMessageCallback } from '../../server/server';

export class Command {
  private static commands: CommandInterface[] = [new ListCommands(), new RenameCommands(), new CreateCommand(), new PostCommand()];
  constructor(private server: Server, private room: Room | undefined, public user: User | undefined, private msgCallbackFn: ServerMessageCallback) {}

  public isCommandExist(commandTxt: string, password: string | null): boolean {
    let [commandName, commandParameter]: string[] = splitOnRandomPieces(commandTxt, ' ', 2);
    let executeCommand = Command.commands.find(command => command.keyword === commandName.substring(1));
    if (executeCommand !== undefined) {
      const [command, parameter]: string[] = splitOnRandomPieces(commandParameter, ' ', 2);
      // If command is execute return true
      if (
        executeCommand.execute({
          command: command,
          parameter: parameter,
          server: this.server,
          room: this.room!,
          user: this.user!,
          authenticated: UserService.authentications(this.user!, password),
          msgCallbackFn: this.msgCallbackFn,
        })
      )
        return true;
    }
    return false;
  }

  public runCommand(commandName: string, subcommand: string, parameter: string, password: string | null): void {
    let executeCommand = Command.commands.find(command => command.keyword === commandName);
    executeCommand!.execute({
      command: subcommand,
      parameter: parameter,
      server: this.server,
      room: this.room!,
      user: this.user!,
      authenticated: UserService.authentications(this.user!, password),
      msgCallbackFn: this.msgCallbackFn,
    });
  }
}
