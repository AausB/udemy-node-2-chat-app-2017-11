
// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Person {
  constructor (name, age) {
    // 'this' refers to the instance
    this.name = name;
    this.age = age;
  }

  getUserDescription () {
    return `${this.name} is ${this.age} year(s) old`;
  }

}

var me = new Person('Alex', 39);
var description = me.getUserDescription();

console.log(description);

// console.log('this.name', me.name);
// console.log('this.age', me.age);
