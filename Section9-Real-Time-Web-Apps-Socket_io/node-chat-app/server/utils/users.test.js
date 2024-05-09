/**
 * File    : users.test.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 8/10/2017
 */
const expect = require('expect');

const {Users} = require('./users');


describe('Users', () => {
  var users;

  beforeEach(() => {
    // create some seed data
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'The IHUs'
    }, {
      id: '2',
      name: 'Tolios',
      room: 'Allou'
    }, {
      id: '3',
      name: 'Lampis',
      room: 'The IHUs'
    }];
  });

  it('should add new user', () => {
    // override the seed data
    var users = new Users();
    var user = {
      id: '123',
      name: 'Tolios',
      room: 'The IHUs'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toMatchObject([user]);
  });

  it('should remove a user', () => {
    var removedUser = users.removeUser('3');

    expect(removedUser).toMatchObject({
      id: '3',
      name: 'Lampis',
      room: 'The IHUs'
    });

    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    var removedUser = users.removeUser('99');

    expect(removedUser).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var user = users.getUser('2');

    expect(user).toMatchObject({
      id: '2',
      name: 'Tolios',
      room: 'Allou'
    });
  });

  it('should not find user', () => {
    var user = users.getUser('99');

    expect(user).toBeFalsy();
  });

  it('should return names for The IHUs', () => {
    var userList = users.getUserList('The IHUs');

    expect(userList).toMatchObject(['Mike', 'Lampis']);
  });

  it('should return names for Allou', () => {
    var userList = users.getUserList('Allou');

    expect(userList).toMatchObject(['Tolios']);
  });

});