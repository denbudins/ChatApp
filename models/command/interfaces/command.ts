import { Server } from '../../server';
import { Room } from '../../room';
import { User } from '../../users';

import { ServerMessageCallback } from '../../../server/server';

export type CommandArgument = {
  command: string;
  parameter: string;
  server: Server;
  room: Room;
  user: User;
  authenticated: boolean;
  msgCallbackFn: ServerMessageCallback;
};

export interface CommandInterface {
  keyword: string;
  execute(options: CommandArgument): boolean;
}
