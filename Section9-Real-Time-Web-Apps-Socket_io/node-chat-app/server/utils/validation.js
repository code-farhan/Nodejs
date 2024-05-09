/**
 * File    : validation.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 7/10/2017
 */

/**
 * isRealString(str): verify that a value is of type string and that is not empty string
 * @param str
 * @returns {boolean}
 */
var isRealString = (str) => {
  return typeof str === 'string' && str.trim().length > 0;
};


module.exports = {isRealString};