import { Room } from './models/room';
import { MyMessagesServices } from './inputFunctions';
import { outputMessages } from './outputFunctions';

const input: string[] = [
  '-@numb Hello?',
  "-@happy Here's a little song I wrote",
  '-@numb Hello ...',
  '-@son Carry on, my wayward son',
  '-@numb Hello ...',
  '-@happy You might want to sing it note for note',
  '-@numb Is there anybody in there?',
  "-@son There'll be peace when you are done",
  "-@happy Don't worry,",
  '-@numb Just nod if you can hear me',
  '-@son Lay your weary head to rest',
  '-@happy Be happy',
  "-@son Don't you cry no more",
  '-@numb Is there anyone home?',
  '-@son BaDa-Da-Dum BaDa-Da-Da-Dum',
];

/*const input: string[] = [
  'roger@numb Hello?',
  "bobby@happy Here's a little song I wrote",
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
];*/

const state: Room[] = MyMessagesServices(input);

console.log(outputMessages(state));
