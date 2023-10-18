import { Message } from '../models/messages/message';
import { Room } from '../models/room';
import { User } from '../models/users';
import { Server, ServerMessageCallbackArgument } from '../server/server';
import { wait } from '../utils/utils';

export const execute = async (msgs: string[], waitTimeSendMsg: number = 50, waitTimePostMsg: number = 200) => {
  let outputs: { msg: Message; recipient: User; room: Room }[] = [];
  const server: Server = new Server(async ({ msg, recipient, room }: ServerMessageCallbackArgument) => {
    await wait(waitTimePostMsg * (1 + Math.random()));
    outputs.push({ msg: msg, recipient: recipient, room: room });
  });

  for (const msg of msgs) {
    await wait(waitTimeSendMsg * (1 + Math.random()));

    await server.postMessage(msg);
  }

  // await server is idle
  await server.waitForServerIdle();

  return outputs;
};
