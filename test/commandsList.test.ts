import { Message } from '../models/messages/message';
import { Room } from '../models/room';
import { User } from '../models/users';

import { execute } from '.';

describe('testing list commands', () => {
  describe('testing list room command', () => {
    let outputs: { msg: Message; recipient: User; room: Room }[];

    test('send list of allowed rooms', async () => {
      outputs = await execute(
        [
          '/create user roger 12345',
          'roger:12345 /create room son non-open',
          'roger:12345@son Hello....',
          '/create user steve',
          'steve /create room numb',
          'steve@numb Carry on, my wayward son',
          'steve@numb Lay your weary head to rest',
          'steve /create room house',
          'steve@house Carry on, my wayward son',
          'steve@house Lay your weary head to rest',
          'steve@numb /list rooms',
        ],
        10,
        50,
      );

      expect(outputs.find(o => o.msg.text.includes(`List of rooms where user steve is allowed to post:`) && o.recipient.userName === 'steve')).toBeTruthy();
      expect(outputs.find(o => o.msg.text.includes(`List of rooms where user steve is allowed to post:`) && o.recipient.userName === 'roger')).not.toBeTruthy();
    });
  });

  describe('testing list users command', () => {
    let outputs: { msg: Message; recipient: User; room: Room }[];

    test('send list all users', async () => {
      outputs = await execute(
        [
          '/create user roger 12345',
          'roger:12345 /create room son non-open',
          'roger:12345@son Hello....',
          '/create user steve',
          'steve /create room numb',
          'steve@numb Carry on, my wayward son',
          'steve@numb Lay your weary head to rest',
          'steve /create room house',
          'steve@house Carry on, my wayward son',
          'steve@house Lay your weary head to rest',
          'steve@numb /list users',
        ],
        10,
        50,
      );

      expect(outputs.find(o => o.msg.text.includes(`The following users are in room numb:`) && o.recipient.userName === 'steve')).toBeTruthy();
      expect(outputs.find(o => o.msg.text.includes(`The following users are in room numb:`) && o.recipient.userName === 'roger')).not.toBeTruthy();
    });
  });
});
