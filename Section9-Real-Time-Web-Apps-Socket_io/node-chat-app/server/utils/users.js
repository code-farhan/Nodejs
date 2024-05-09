/**
 * File    : users.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 8/10/2017
 */
/* e.g. users structure
[{
  id: '/#dsdfsdg4sdf',
  name: 'Tolios',
  room: 'The IHUs'
}]
*/

/**
 * Users Class
 */
class Users{
  constructor() {
    this.users = [];
  }

  /**
   * addUser(id, name, room): Adds a new user
   * @param id
   * @param name
   * @param room
   * @returns {{id: *, name: *, room: *}}
   */
  addUser(id, name, room){
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }

  /**
   * removeUser(id): returns a user and removes him/her from the users obj based on id
   * @param id
   * @returns {User|undefined}
   */
  removeUser(id){
    var removedUser = this.getUser(id);

    if (removedUser){
      this.users = this.users.filter((user) => user.id !== id);
    }

    return removedUser;
  }

  /**
   * getUser(id): return a user given an id
   * @param id
   * @returns {User|undefined}
   */
  getUser(id){
    return this.users.filter((user) => user.id === id)[0];
  }

  /**
   * getUserList(room): returns a list of user names based on room name
   * @param room
   * @returns {Array}
   */
  getUserList(room){
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);

    return namesArray;
  }
}

module.exports = {Users};

// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription () {
//     return `${this.name} is ${this.age} year(s) old.`
//   }
// }
//
// var me = new Person('Tolios', 30);
// console.log(me.getUserDescription());











