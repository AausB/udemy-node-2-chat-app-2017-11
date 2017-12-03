var socket = io();

// built-in  event for establishing connection
socket.on('connect', function () {
  console.log('Connected to server');
});

// built-in event for disconnect
socket.on('disconnect', function () {
  console.log('Disconnected from server')
});

// custom event listener
socket.on('newMessage', function(message) {
  console.log('Got new message', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

// // emit an event
// socket.emit('createMessage', {
//   from: 'frank',
//   text: 'Hi'
// }, function(data) { // callback function for acknowledgement
//   console.log('From server', data);
// });

jQuery('#message-form').on('submit', function (event) {
  event.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function(data) {
    console.log(data);
  });
});
