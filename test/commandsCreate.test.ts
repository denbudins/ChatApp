import { Message } from '../models/messages/message';
import { Room } from '../models/room';
import { User } from '../models/users';
import { execute } from '.';

describe('testing create commands', () => {
  describe('testing create room command', () => {
    let outputs: { msg: Message; recipient: User; room: Room }[];

    test('create new open room with register user and "open" parameter in command', async () => {
      outputs = await execute(
        [
          '/create user roger 12345',
          'roger:12345 /create room son open',
          'roger:12345@son Hello....',
          'steve@son Carry on, my wayward son',
          'steve@son Lay your weary head to rest',
          'bobby@happy Be happy',
          'steve@son /rename room sonne',
        ],
        10,
        50,
      );

      expect(outputs.find(o => o.msg.text === `Room son is created and have status "open"` && o.recipient.userName === 'roger')).toBeTruthy();
      expect(outputs.find(o => o.msg.text === `Room son is created and have status "open"` && o.recipient.userName === 'steve')).not.toBeTruthy();
      expect(outputs.find(o => o.msg.text === `Room son is created and have status "open"` && o.recipient.userName === 'bobby')).not.toBeTruthy();
    });

    test('create new open room with register user without "open" parameter in command', async () => {
      outputs = await execute(
        [
          '/create user roger 12345',
          'roger:12345 /create room son',
          'roger:12345@son Hello....',
          'steve@son Carry on, my wayward son',
          'steve@son Lay your weary head to rest',
          'bobby@happy Be happy',
          'steve@son /rename room sonne',
        ],
        10,
        50,
      );

      expect(outputs.find(o => o.msg.text === `Room son is created and have status "open"` && o.recipient.userName === 'roger')).toBeTruthy();
      expect(outputs.find(o => o.msg.text === `Room son is created and have status "open"` && o.recipient.userName === 'steve')).not.toBeTruthy();
      expect(outputs.find(o => o.msg.text === `Room son is created and have status "open"` && o.recipient.userName === 'bobby')).not.toBeTruthy();
    });

    test('create new open room with non register user and "open" parameter in command', async () => {
      outputs = await execute(
        [
          '/create user roger',
          'roger /create room son open',
          'roger:12345@son Hello....',
          'steve@son Carry on, my wayward son',
          'steve@son Lay your weary head to rest',
          'bobby@happy Be happy',
          'steve@son /rename room sonne',
        ],
        10,
        50,
      );

      expect(outputs.find(o => o.msg.text === `Room son is created and have status "open"` && o.recipient.userName === 'roger')).toBeTruthy();
      expect(outputs.find(o => o.msg.text === `Room son is created and have status "open"` && o.recipient.userName === 'steve')).not.toBeTruthy();
      expect(outputs.find(o => o.msg.text === `Room son is created and have status "open"` && o.recipient.userName === 'bobby')).not.toBeTruthy();
    });

    test('create new open room with non register user without "open" parameter in command', async () => {
      outputs = await execute(
        [
          '/create user roger',
          'roger /create room son',
          'roger:12345@son Hello....',
          'steve@son Carry on, my wayward son',
          'steve@son Lay your weary head to rest',
          'bobby@happy Be happy',
          'steve@son /rename room sonne',
        ],
        10,
        50,
      );

      expect(outputs.find(o => o.msg.text === `Room son is created and have status "open"` && o.recipient.userName === 'roger')).toBeTruthy();
      expect(outputs.find(o => o.msg.text === `Room son is created and have status "open"` && o.recipient.userName === 'steve')).not.toBeTruthy();
      expect(outputs.find(o => o.msg.text === `Room son is created and have status "open"` && o.recipient.userName === 'bobby')).not.toBeTruthy();
    });

    test('create new non open room with register user', async () => {
      outputs = await execute(
        [
          '/create user roger 12345',
          'roger:12345 /create room son non-open',
          'roger:12345@son Hello....',
          'steve@son Carry on, my wayward son',
          'steve@son Lay your weary head to rest',
          'bobby@happy Be happy',
          'steve@son /rename room sonne',
        ],
        10,
        50,
      );

      expect(outputs.find(o => o.msg.text === `Room son is created and have status "non-open"` && o.recipient.userName === 'roger')).toBeTruthy();
      expect(outputs.find(o => o.msg.text === `Room son is created and have status "non-open"` && o.recipient.userName === 'steve')).not.toBeTruthy();
      expect(outputs.find(o => o.msg.text === `Room son is created and have status "non-open"` && o.recipient.userName === 'bobby')).not.toBeTruthy();
    });

    test('create new non-open room with non register user', async () => {
      outputs = await execute(
        [
          '/create user roger',
          'roger /create room son non-open',
          'roger:12345@son Hello....',
          'steve@son Carry on, my wayward son',
          'steve@son Lay your weary head to rest',
          'bobby@happy Be happy',
          'steve@son /rename room sonne',
        ],
        10,
        50,
      );

      expect(outputs.find(o => o.msg.text === `Room son is created and have status "non-open"` && o.recipient.userName === 'roger')).not.toBeTruthy();
      expect(outputs.find(o => o.msg.text === `Room son is created and have status "non-open"` && o.recipient.userName === 'steve')).not.toBeTruthy();
      expect(outputs.find(o => o.msg.text === `Room son is created and have status "non-open"` && o.recipient.userName === 'bobby')).not.toBeTruthy();
    });
  });
  describe('testing create user command', () => {
    let outputs: { msg: Message; recipient: User; room: Room }[];

    test('create new register user', async () => {
      outputs = await execute(
        [
          '/create user roger 12345',
          'roger:12345 /create room son non-open',
          'roger:12345@son Hello....',
          'steve@son Carry on, my wayward son',
          'steve@son Lay your weary head to rest',
        ],
        10,
        50,
      );

      expect(outputs.find(o => o.msg.text === `New register user is created whit username roger` && o.recipient.userName === 'roger')).toBeTruthy();
      expect(outputs.find(o => o.msg.text === `New register user is created whit username roger` && o.recipient.userName === 'steve')).not.toBeTruthy();
      expect(outputs.find(o => o.msg.text === `New register user is created whit username roger` && o.recipient.userName === 'bobby')).not.toBeTruthy();
    });

    test('create new non register user', async () => {
      outputs = await execute(
        [
          '/create user roger',
          'roger:12345 /create room son non-open',
          'roger:12345@son Hello....',
          'steve@son Carry on, my wayward son',
          'steve@son Lay your weary head to rest',
        ],
        10,
        50,
      );

      expect(outputs.find(o => o.msg.text === `New non register user is created whit username roger` && o.recipient.userName === 'roger')).toBeTruthy();
      expect(outputs.find(o => o.msg.text === `New non register user is created whit username roger` && o.recipient.userName === 'steve')).not.toBeTruthy();
      expect(outputs.find(o => o.msg.text === `New non register user is created whit username roger` && o.recipient.userName === 'bobby')).not.toBeTruthy();
    });
  });
});
