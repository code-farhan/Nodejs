/**
 * File    : app.test.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 1/10/2017
 */
const expect = require('expect');// spies are built in expect
const rewire = require('rewire');// swap out variables for our tests

var app = rewire('./app');
// app.__set__
// app.__get__

// we use spies to test functions inside of functions
// and we simulate these other functions (we fake them)
// in our example we want to change the "db.saveUser({ email, password});",
//    with a spy (fake) "saveUser()".
// It will not call the actual saveUser() function from the db.js
// In our tests, we only care that we call this function with correct arguments!

describe('App', () => {

    // Read the const db object and tweak one of its properties
    const db = app.__get__('db');
    db.saveUser = expect.createSpy(); // this is our Spy method. a fake saveUser()

    it('should call the spy correctly', () => {
        var spy = expect.createSpy();
        spy('Tolios', 30);
        expect(spy).toHaveBeenCalledWith('Tolios', 30);
    });

    // Verify functions that call other functions, using spies
    it('should call saveUser with user object', () => {
       var email = 'apo@example.com';
       var password = '123abc';

       app.handleSignup(email, password);
       expect(db.saveUser).toHaveBeenCalledWith({email, password});
    });
});
