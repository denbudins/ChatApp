import { Server } from '../../models/server';
import { Room } from '../../models/room';
import { User } from '../../models/users';

import { ServerMessageCallback } from '../../server/server';

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
