import { CommandInterface } from '../../interfaces/command';
import { ListCommands } from './list/listCommand';
import { RenameCommands } from './rename/renameCommand';
import { Room } from '../room';
import { User } from '../users';
import { Server } from '../../server/server';
import { splitOnRandomPieces } from '../../utils/utils';

export class Command {
  private commands: CommandInterface[] = [new ListCommands(), new RenameCommands()];
  constructor(private server: Server, private room: Room, private user: User) {}

  public isCommandExist(commandTxt: string): boolean {
    let [commandName, commandParameter]: string[] = splitOnRandomPieces(commandTxt, ' ', 2);
    let executeCommand = this.commands.find(command => command.keyword === commandName);
    if (executeCommand !== undefined) {
      // If command is execute return true
      if (executeCommand.execute(commandParameter, this.server, this.room, this.user)) return true;
    }
    return false;
  }
}
