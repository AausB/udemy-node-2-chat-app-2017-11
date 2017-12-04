const {expect} = require('chai');

const {Users} = require('./users');

describe('Users', () => {

  // users accessible from all functions in this describe()
  let users;


  beforeEach(() => {
    users = new Users();

    users.users = [{
        id: '1',
        name: 'User1',
        room: 'Room1'
    }, {
        id: '2',
        name: 'User2',
        room: 'Room2'
    }, {
        id: '3',
        name: 'User3',
        room: 'Room2'
    }];
  });


  it('should add new user', () => {
    let users = new Users();
    let user = {
      id: '123',
      name: 'alex',
      room: 'my room'
    };

    let resultUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).to.deep.equal([user]);
    expect(resultUser).to.deep.equal(user);
  });

  it('should remove a user', () => {
    let removedUser = users.removeUser('2');

    expect(users.users.length).to.equal(2);
    expect(removedUser).to.deep.equal({
        id: '2',
        name: 'User2',
        room: 'Room2'
    });
  });

  it('should NOT remove user', () => {
    let removedUser = users.removeUser('0');

    expect(users.users.length).to.equal(3);
    expect(removedUser).to.be.undefined;
  });


  it('should find user', () => {
    let resultUser = users.getUser('2');
    expect(resultUser).to.deep.equal({
        id: '2',
        name: 'User2',
        room: 'Room2'
    });
  });

  it('should NOT find user', () => {
    let resultUser = users.getUser('0');
    expect(resultUser).to.be.undefined;
  });
  

  it('should return names for Room1', () => {
    let userList = users.getUserList('Room1');

    expect(userList).to.deep.equal(['User1']);
  });


  it('should return names for Room2', () => {
    let userList = users.getUserList('Room2');

    expect(userList).to.deep.equal(['User2', 'User3']);
  });

});
