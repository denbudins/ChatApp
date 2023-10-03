const utils = require('../utils/utils');

describe('testing split on random pieces function', () => {
  test('split on 1 pieces', () => {
    const input = "bobby:test@happy Here's a little song I wrote";
    const separator = ' ';
    const numberOfPieces = 1;

    const expectResult = ["bobby:test@happy Here's a little song I wrote"];
    expect(utils.splitOnRandomPieces(input, separator, numberOfPieces)).toStrictEqual(expectResult);
  });

  test('split on 2 pieces', () => {
    const input = '/create room numb';
    const separator = '@';
    const numberOfPieces = 2;

    const expectResult = ['/create room numb', ''];
    expect(utils.splitOnRandomPieces(input, separator, numberOfPieces)).toStrictEqual(expectResult);
  });

  test('split on 3 pieces', () => {
    const input = "bobby:test@happy Here's a little song I wrote";
    const separator = ' ';
    const numberOfPieces = 3;

    const expectResult = ['bobby:test@happy', "Here's", 'a little song I wrote'];
    expect(utils.splitOnRandomPieces(input, separator, numberOfPieces)).toStrictEqual(expectResult);
  });
});
