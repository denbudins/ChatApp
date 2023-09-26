import { Room } from '../models/room';
import { User } from '../models/users';
import { Server } from '../server/server';

export interface CommandInterface {
  keyword: string;
  execute(commandParameters: string, server: Server, room: Room, user: User): boolean;
}
