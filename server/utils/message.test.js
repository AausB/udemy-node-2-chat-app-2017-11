const {expect} = require('chai');

const {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    let from = 'testUser';
    let text = 'test text';

    let message = generateMessage(from, text);

    expect(Object.keys(message).length).to.equal(3); // 3 properties in object
    // expect(message.from).to.equal(from);
    // expect(message.text).to.equal(text);
    // alternatively:
    expect(message).to.include({
      from,
      text
    });

    expect(message.createdAt).to.be.a('number');
  });
});
