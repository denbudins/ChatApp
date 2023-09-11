import { Room } from './models/room';
import { msgCallbackFn } from './inputFunctions';

let state: Room[] = [];

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

  for (const msg of msgs) {
    await msgCallbackFn(state, msg);
  }
})();
