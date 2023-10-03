import 'colors';
import { Server, ServerMessageCallbackArgument } from './server/server';
import { wait } from './utils/utils';

(async () => {
  const msgs: string[] = [
    'roger@numb Hello?',
    "bobby:test@happy Here's a little song I wrote",
    'echo /create room numb open',
    'echo@numb Hello ...',
    '/create user roger 12345',
    'roger:12345 /create room son non-open',
    'steve@son Carry on, my wayward son',
    'echo@numb /rename self neho',
    'bobby@happy You might want to sing it note for note',
    'roger:12345@son Is there anybody in there?',
    'roger:12345@numb /list users',
    'echo@numb /list users',
    "steve@son There'll be peace when you are done",
    "bobby@happy Don't worry,",
    'roger@numb Just nod if you can hear me',
    'roger:12345@son /list messages',
    'steve@son Lay your weary head to rest',
    'bobby@happy Be happy',
    'steve@son /rename room sonne',
    'roger@numb Is there anyone home?',
    'kerry@son BaDa-Da-Dum BaDa-Da-Da-Dum',
    'roger@son /list rooms',
  ];

  const msgCallbackFn = async ({ room, recipient, sender, msg }: ServerMessageCallbackArgument): Promise<void> => {
    console.log(`SERVER replying ...`.gray);

    await wait(200 * (1 + Math.random()));

    if (room === undefined) {
      console.log(`"${sender?.userName}" posted: "${msg.text}"`.yellow);
    } else {
      console.log(`${room.name}:${recipient.userName}" ::: "${sender?.userName}" posted: "${msg.text}"`.yellow);
    }
  };

  const msgCallbackFn2 = async ({ room, recipient, sender, msg }: ServerMessageCallbackArgument): Promise<void> => {
    console.log(`SERVER replying ...`.blue);

    await wait(200 * (1 + Math.random()));

    if (room === undefined) {
      console.log(`"${sender?.userName}" posted: "${msg.text}"`.red);
    } else {
      console.log(`${room.name}:${recipient.userName}" ::: "${sender?.userName}" posted: "${msg.text}"`.red);
    }
  };

  const server: Server = new Server(msgCallbackFn);

  for (const msg of msgs) {
    await wait(50 * (1 + Math.random()));

    console.log(`POSTing message: "${msg}"`.gray);

    await server.postMessage(msg).then(() => {
      console.log(`  > Message "${msg}" ACK!`.gray);
    });
  }

  /*const server2: Server = new Server(msgCallbackFn2);

  for (const msg of msgs) {
    await wait(50 * (1 + Math.random()));

    console.log(`POSTing message: "${msg}"`.gray);

    await server2.postMessage(msg).then(() => {
      console.log(`  > Message "${msg}" ACK!`.gray);
    });
  }*/
})();
