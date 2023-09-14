import 'colors';
import { Server, ServerMessageCallback } from './server/server';
import { wait } from './utils/utils';

(async () => {
  const msgs: string[] = [
    'roger@numb Hello?',
    "bobby:test@happy Here's a little song I wrote",
    'echo@numb Hello ...',
    'steve@son Carry on, my wayward son',
    'echo@numb Hello ...',
    'bobby@happy You might want to sing it note for note',
    'roger@numb Is there anybody in there?',
    "steve@son There'll be peace when you are done",
    "bobby@happy Don't worry,",
    'roger@numb Just nod if you can hear me',
    'steve@son Lay your weary head to rest',
    'bobby@happy Be happy',
    "steve@son Don't you cry no more",
    'roger@numb Is there anyone home?',
    'kerry@son BaDa-Da-Dum BaDa-Da-Da-Dum',
  ];

  const msgCallbackFn = async ({ room, recipient, sender, msg }: ServerMessageCallback): Promise<void> => {
    console.log(`SERVER replying`.green);

    await wait(2000 * (1 + Math.random()));

    if (sender?.userName === 'SERVER') {
      console.log(`To "${recipient.userName}" ::: Announcement in room "${room.id}": ${msg.text}`.blue);
    } else {
      console.log(`To "${recipient.userName}" ::: "${sender?.userName}" posted in "${room.id}": "${msg.text}"`.white);
    }
  };

  const server: Server = new Server(msgCallbackFn);

  for (const msg of msgs) {
    await wait(50 * (1 + Math.random()));

    console.log(`POSTing message: "${msg}"`.green);

    server.postMessage(msg).then(() => {
      console.log(`  > Message "${msg}" ACK!`.green);
    });
  }
})();
