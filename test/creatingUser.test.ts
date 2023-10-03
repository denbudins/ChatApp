const createUser = require('../models/command/create/createUser');
const { User } = require('../models/users');

test('registering new user', () => {
    const inputUserName = 'denis';
    const inputUserPassword = '12345';

    const expectResult = new User('denis');
    expectResult.password = '12345';
    expect(createUser.registeringNewUser(inputUserName,inputUserPassword).userName).toStrictEqual(expectResult.userName);
    expect(createUser.registeringNewUser(inputUserName,inputUserPassword).password).toStrictEqual(expectResult.password);
});

test('creating new non register user', () => {
    const input = 'denis';

    const expectResult = new User('denis');
    expect(createUser.creatingNonRegisterUser(input).userName).toStrictEqual(expectResult.userName);
    expect(createUser.creatingNonRegisterUser(input).password).toStrictEqual(expectResult.password);
});

test('creating new user', () => {
    const input = 'denis 12345';

    const expectResult = true;
    expect(createUser.creatingNewUser(input)).toStrictEqual(expectResult);
});