/**
 * File    : user.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 2/10/2017
 */
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');


var UserSchema = new mongoose.Schema({
  email: {
    required: true,
    trim: true,
    type: String,
    minlength: 1,
    unique: true,
    validate: {
      isAsync: false,
      validator: validator.isEmail,
      message: `{VALUE} is not a valid email`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

// Instance methods
UserSchema.methods.generateAuthToken = function () {
  var user = this; // individual document
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token; // We can chain a promise to this return
  });
};

UserSchema.methods.removeToken = function (token) {
  var user = this;

  return user.update({
    // from MongoDB: $pull: lets you remove items from an array, that match certain criteria
    $pull: {
      tokens: {token}
    }
  });
};

// Model Method
UserSchema.statics.findByToken = function (token) {
  var User = this; // model
  var decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    // return new Promise((resolve, reject) => {
    //   reject();
    // })
    // same as above but simpler
    return Promise.reject();
  }

  // We can chain a promise to this return
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;

  return User.findOne({email}).then((user) => {
    // if user does not exist
    if (!user){
        return Promise.reject();
    }

    // if user exists, compare the password
    return new Promise((resolve, reject) => {
      // bcrypt only supports callbacks! that's why we wrap it in a Promise!
      // make a comparison of the plain pass and the hashed pass
      bcrypt.compare(password, user.password, (err, res) => {
        if (res){
          resolve(user);
        } else {
          reject();
        }
      });
    })

  })
};

// Mongoose Middleware - run a function before (pre) some event (save)
UserSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')){
    // password just modified, so hash it!
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    // pass is already hashed, so move on
    next();
  }
});


var User = mongoose.model('User', UserSchema );

module.exports = {User};