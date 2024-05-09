/**
 * File    : server.js.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 5/10/2017
 */
const path = require('path');
const fs = require('fs');
const http = require('http');
const express = require('express');
const sockeetIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = new express();
var server = http.createServer(app);
var io = sockeetIO(server);
var users = new Users();


// middleware to keep track of our server requests
// app.use((req, res, next) => {
//   var now = new Date().toString();
//   // log a timestamp + request method + requested path
//   var log = `${now}: ${req.method} ${req.url}`;
//   // log to console the request
//   console.log(log);
//   // save the request to a file
//   fs.appendFile('server.log', log + '\n', (err) => {
//     if (err) {
//       console.log('Unable to append to server.log. ', err);
//     }
//   });
//   next();
// });

// express static middleware: read from public directory
app.use(express.static(publicPath));

/**
 * io.on( 'event' , cb): lets us to register an event listener
 * - we can listen for a specific event and do sth, when that event happens
 *
 * - the built-in 'connection' event: which let us listen for a new connection
 *    + meaning that a client connected to the server. And let us do sth when
 *    + that connection comes
 */
io.on('connection', (socket) => {
  console.log('New user connected.');


  // listen for 'join' events
  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }

    socket.join(params.room); // e.g: params.room = 'The IHUs'
    // socket.leave('The IHUs');
    // remove user from any room. This prevents a user to be in many rooms
    users.removeUser(socket.id);
    // add a new user
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    /*
     *
     * -- Emitting events to users
     * io.emit(): let us to emit events to EVERY single Connection
     * socket.broadcast.emit(): let us to emit events to everyone connected to the socket server except
     *                          for the current user
     * socket.emit(): let us emit an event specifically to one user
     *
     * -- Emitting events to rooms
     * io.emit -> io.to('The IHUs').emit
     * socket.broadcast.emit -> socket.broadcast.to('The IHUs').emit
     * socket.emit -> the same :P  we target a specific user!
     * */

    // emit a welcome message when someone connects
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    // let all connected clients that a new client joined the chat
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} - has joined the room.`));
    callback();
  });

  // listen for 'createMessage' events
  socket.on('createMessage', (message, callback) => {
    //console.log('createMessage',message);

    // we will ned the user information
    var user = users.getUser(socket.id);

    if (user && isRealString(message.text)){
      // create a 'newMessage' event and send it everywhere
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }

    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    // we will ned the user information
    var user = users.getUser(socket.id);

    if (user){
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
    }
  });

  // listen for the 'disconnect' event, from the client side
  socket.on('disconnect', () => {
    // remove user on disconnect
    var user = users.removeUser(socket.id);

    if (user) {
      // update the user list
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      // display a message to everyone, regarding the user left
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} - has left the room.`));
    }
    console.log('User was disconnected.');
  })
});


server.listen(port, () => {
  console.log(`
 ▂▃▅▇█▓▒░░░░--------------░░░░▒▓█▇▅▃▂`);
  console.log(`█   `, `Server listening on port: ${port}`, `   █`);
  if (port === 3000) {
    console.log(`█   `, `Visit: http://localhost:${port}/`, `    █`);
  }
  console.log(`▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄`);
  console.log('');
});