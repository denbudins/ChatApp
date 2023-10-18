import { Server } from '../../models/server';
import { Room } from '../../models/room';
import { User } from '../../models/users';

import { ServerMessageCallback } from '../../server/server';
import { Message } from '../../models/messages/message';

export type CommandArgument = {
  parameter?: string[];
  server?: Server;
  room?: Room;
  user?: User;
  msg?: Message;
  authenticated?: boolean;
  msgCallbackFn?: ServerMessageCallback;
};

export interface CommandInterface {
  keyword: string;
  execute(options: CommandArgument): boolean;
}
