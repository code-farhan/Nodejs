/**
 * File    : time.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 6/10/2017
 */

/**
 * Unix time (also known as POSIX time or epoch time)
 * is a system for describing a point in time, defined as the number of seconds that
 * have elapsed since 00:00:00 Coordinated Universal Time (UTC)
 * , Thursday, 1 January 1970 (or else: Jan 1st 1970 00:00:00 am)
 * ,minus the number of leap seconds that have taken place since then.
 */

// In JavaScript we count in milliseconds - 1s = 1000ms
// thus a timestamp: 1000 is equal to: Jan 1st 1970 00:00:01 am

// this will return a big number, representing the milliseconds passed,
// since Jan 1st 1970 00:00:00 am and Now.
// var timestamp = new Date().getTime();
//
// var date = new Date();

// return the current month in zero based format!
// console.log(date.getMonth());
// match the current month to a String representation like: Jan, Feb
// we must make an array with all the values ['Jan', 'Feb'..] and with
// the above, to retrieve the String value based on the index number.

// ***********************************

// To to the RESCUE: moment.js

const moment = require('moment');

// var date = moment();
// console.log(date.format());
// console.log(date.format('MMM Do, YYYY '));
// console.log('--------------------------------------');
// // date.add(100, 'years').subtract(9, 'months');
// // console.log(date.format('MMM Do, YYYY '));
// console.log('--------------------------------------');
//
// var time = moment();
// // 10:35 am
// console.log(time.format('h:mm a'));

var createdAt = moment().valueOf();
console.log(createdAt);
var date = moment(createdAt);
console.log(date);