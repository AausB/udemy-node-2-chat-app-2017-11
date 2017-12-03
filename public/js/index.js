var socket = io();

// built-in  event for establishing connection
socket.on('connect', function () {
  console.log('Connected to server');

  // custom event emitter
  socket.emit('createMessage', {
    from: 'alex',
    text: 'Hey, this is a message from Alex.'
  });
});

// built-in event for disconnect
socket.on('disconnect', function () {
  console.log('Disconnected from server')
});

// custom event listener
socket.on('newMessage', function(message) {
  console.log('Got new message', message);
})
