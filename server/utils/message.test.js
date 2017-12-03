const {expect} = require('chai');

const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    let from = 'testUser';
    let text = 'test text';

    let message = generateMessage(from, text);

    expect(Object.keys(message).length).to.equal(3); // 3 properties in object
    expect(message.createdAt).to.be.a('number');
    // expect(message.from).to.equal(from);
    // expect(message.text).to.equal(text);
    // alternatively:
    expect(message).to.include({
      from,
      text
    });
  });
});


describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    let from = 'testUser';
    let latitude = 1;
    let longitude = 1;
    let url = 'https://google.com/maps?q=1,1';

    let message = generateLocationMessage(from, latitude, longitude);
    expect(Object.keys(message).length).to.equal(3); // 3 properties in object
    expect(message.createdAt).to.be.a('number');
    expect(message).to.include({
      from,
      url
    });
  });
});
