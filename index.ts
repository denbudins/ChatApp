import { Server } from './server/server';
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

  const msgCallbackFn = async (serverPost: boolean, toUser: string, fromRoom: string, sender: string | undefined, msgForSend: string): Promise<undefined> => {
    return new Promise(resolve => {
      setTimeout(() => {
        if (serverPost) {
          console.log(`To "${toUser}" ::: Announcement in room "${fromRoom}": ${msgForSend}`);
        } else {
          console.log(`To "${toUser}" ::: "${sender}" posted in "${fromRoom}": "${msgForSend}"`);
        }
        resolve(undefined);
      }, 500);
    });
  };

  const server: Server = new Server([], msgCallbackFn);

  for (const msg of msgs) {
    await wait(500 + 500 * Math.random());

    console.log(`POSTing message: "${msg}"`);

    server.MyMessagesServices(msg);
  }
})();
