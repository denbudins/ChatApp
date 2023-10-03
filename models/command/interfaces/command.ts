import { Room } from '../../room';
import { User } from '../../users';

import { ServerMessageCallback } from '../../../server/server';
import { ServerServices } from '../../../services/serverService';

export type CommandArgument = {
  command: string;
  parameter: string;
  server: ServerServices;
  room: Room;
  user: User;
  authenticated: boolean;
  msgCallbackFn: ServerMessageCallback;
};

export interface CommandInterface {
  keyword: string;
  execute(options: CommandArgument): boolean;
}
