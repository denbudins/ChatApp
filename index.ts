import messeges from "./models/messegs";
import { paresMesseges } from "./inputFunctions";
import { outputMesseges } from "./outputFunctions";

let messegesAllRooms: messeges[] = paresMesseges(
  "someone@numb: Hello? -@happy: Here's a little song: I wrote someone@numb: Hello ... -@son: Carry on, my wayward son -@numb: Hello ... -@happy: You might want to sing it note for note -@numb: Is there anybody in there? -@son: There'll be peace when you are done -@happy: Don't worry, -@numb: Just nod if you can hear me -@son: Lay your weary head to rest -@happy: Be happy -@son: Don't you cry no more -@numb: Is there anyone home? -@son: BaDa-Da-Dum BaDa-Da-Da-Dum"
);

console.log(outputMesseges(messegesAllRooms));
