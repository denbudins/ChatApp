import { Message } from '../models/messages/message';
import { Room } from '../models/room';
import { User } from '../models/users';

import { execute } from '.';

describe('testing rename commands', () => {
  let outputs: { msg: Message; recipient: User; room: Room }[];

  describe('testing rename username command', () => {
    test('check is all user received message', async () => {
      outputs = await execute(
        [
          'roger@numb Hello?',
          "bobby:test@happy Here's a little song I wrote",
          'echo /create room numb open',
          'echo@numb Hello ...',
          '/create user roger 12345',
          'steve@son Carry on, my wayward son',
          "bobby@numb Don't worry,",
          'roger@numb Hello?',
          'echo@numb /rename self neho',
        ],
        10,
        50,
      );

      expect(
        outputs.filter(object => {
          if (object.msg.text === `"echo" changed username to neho`) return object.msg;
        }).length,
      ).toEqual(3);

      expect(outputs.find(o => o.msg.text === `"echo" changed username to neho` && o.recipient.userName === 'bobby')).toBeTruthy();
      expect(outputs.find(o => o.msg.text === `"echo" changed username to neho` && o.recipient.userName === 'roger')).toBeTruthy();
      expect(outputs.find(o => o.msg.text === `"echo" changed username to neho` && o.recipient.userName === 'neho')).toBeTruthy();
      expect(outputs.find(o => o.msg.text === `"echo" changed username to neho` && o.recipient.userName === 'echo')).not.toBeTruthy();
    });
  });

  describe('testing rename room command', () => {
    test('register user rename non-open room', async () => {
      outputs = await execute(
        [
          '/create user roger 12345',
          'roger:12345 /create room son non-open',
          'steve@son Carry on, my wayward son',
          'steve@son Lay your weary head to rest',
          'bobby@happy Be happy',
          'roger:12345@son /rename room sonne',
        ],
        10,
        50,
      );

      expect(outputs.find(o => o.msg.text === `Room son changed name to sonne` && o.room.name === 'sonne')).toBeTruthy();
    });
  });
  test('non-register user rename non-open room', async () => {
    outputs = await execute(
      [
        '/create user roger 12345',
        'roger:12345 /create room son non-open',
        'steve@son Carry on, my wayward son',
        'steve@son Lay your weary head to rest',
        'bobby@happy Be happy',
        'steve@son /rename room sonne',
      ],
      10,
      50,
    );

    expect(outputs.find(o => o.msg.text === `Room son changed name to sonne` && o.room.name === 'sonne')).not.toBeTruthy();
  });
});
