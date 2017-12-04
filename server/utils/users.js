class Users {
  constructor () {
    this.users = []; // the users list array
  }

  addUser (id, name, room) {
    let user = {id, name, room};

    this.users.push(user);
    return user;
  }

  removeUser (id) {
    let user = this.getUser(id);
    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    
    return user;
  }

  getUser (id) {
    let resultUser = this.users.filter((user) => {
      return user.id === id;
    });

    return resultUser[0];
  }

  getUserList (room) {
    // returns an array of user names
    let users = this.users.filter((user) => {
      return user.room === room;
    });

    let namesArray = users.map((user) => user.name);

    return namesArray;
  }


}

module.exports = {Users};
