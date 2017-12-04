const {expect} = require('chai');

const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    let result = isRealString(1234);

    expect(result).to.be.false;
  });

  it('should reject string with only spaces', () => {
    let result = isRealString('   ');

    expect(result).to.be.false;

  });

  it('should allow strings with non-space characters', () => {
    let result = isRealString('1234');

    expect(result).to.be.true;

  });
});
