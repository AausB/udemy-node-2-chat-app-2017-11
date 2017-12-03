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

socket.on('newLocationMessage', function(message) {
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">my current location</a>')

  li.text(`${message.from}: `);
  a.attr('href', message.url);

  li.append(a);
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

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function() {
    messageTextbox.val(''); // clear the input field
  });
});

//
// Button "Send Location"
//
var locationButton = jQuery('#send-location');

locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported');
  }

  locationButton.attr('disabled', 'disabled').text('Sending ...');

  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function() {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  });

});
