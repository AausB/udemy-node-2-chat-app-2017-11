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
});
