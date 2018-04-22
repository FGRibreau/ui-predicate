// why? because I HATE ES6 import/export
const { Type, Target, Operator } = require('./columns');

const { prop } = require('ramda');

describe('Type', () => {
  it('allow for more operators', () => {
    expect(
      Type({
        type_id: 'int',
        operator_ids: ['isLowerThan', 'isEqualTo', 'isHigherThan'],
        myAwesomeAttribute: true,
      }).myAwesomeAttribute
    ).toBe(true);
  });
});
