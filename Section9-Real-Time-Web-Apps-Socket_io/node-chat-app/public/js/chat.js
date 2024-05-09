/**
 * File    : index.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 6/10/2017
 */
var socket = io();

function scrollToBottom(){
  // Selectors
  var messages = jQuery('#messages'); // Message container
  var newMessage = messages.children('li:last-child'); // Last message li item

  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight(); // get height of Last message
  var lastMessageHeight = newMessage.prev().innerHeight(); // get height of pre-last message

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
      messages.scrollTop(scrollHeight);
  }
};


// listen for the 'connect' event
socket.on('connect', function () {
  var params = jQuery.deparam(window.location.search);

  // emit a 'join' event to the server
  socket.emit('join', params, function (err) {
    if (err){
      alert(err);
      window.location.href = '/';
    } else {
      console.log('No error');
    }

  });
});

// listen for the 'disconnect' event
socket.on('disconnect', function () {
  console.log('Disconnected from server.');
});

// listen for 'updateUserList' events
socket.on('updateUserList', function (users) {
  var ol = jQuery('<ol></ol>');

  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
});

// listen for 'newMessage' events
socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});

// handle Message Form submission
jQuery('#message-form').on('submit', function (e) {
  // prevent submit
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');
  // send/emit a new message
  socket.emit('createMessage', {
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('')
  })
});

// store our send-location button selector
var locationButton = jQuery('#send-location');

// add a 'click' listener
locationButton.on('click', function () {
  // if geolocation is not supported
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  // try to fetch user geolocation
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    // if we successfully get the geolocation, emit a 'createLocationMessage' event
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    // if user forbid us from getting his location, throw an error
    alert('Unable to fetch location. Please allow location share.');
  });
});


