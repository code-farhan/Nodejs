/**
 * File    : validation.test.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 7/10/2017
 */
const expect = require('expect');

const {isRealString} = require('./validation');


describe('isRealString', () => {
  it('should reject non-string values', () => {
    var aString = 55;
    var result = isRealString(aString);

    //assert result to be false
    expect(result).toBe(false);
  });

  it('should reject strings with only spaces', () => {
    var aString = '          ';
    var result = isRealString(aString);

    //assert result to be false
    expect(result).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    var aString = ' The Real Thing     ';
    var result = isRealString(aString);

    //assert result to be true
    expect(result).toBe(true);
  });
});