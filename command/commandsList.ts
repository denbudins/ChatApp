import { CommandInterface } from './interfaces/command';

export class CommandList {
  public static commandList: CommandInterface[] = [];

  public static addCommand(command: CommandInterface) {
    this.commandList.push(command);
  }
}
