/**
 * File    : app.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 1/10/2017
 */
const db = require('./db.js');


module.exports.handleSignup = (email, password) => {
    // Check if email already exists

    // save the user to the database
    db.saveUser({ email, password});

    // Send the welcome email

};