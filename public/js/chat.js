var socket = io();

function scrollToBottom() {
  // selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');

  // heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }

}

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
  // get the html from the script #message-template  in index.html
  var formattedTime = moment(message.createdAt).format('HH:mm:ss');
  // get the inner html back
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
  // get the html from the script #message-template  in index.html
  var formattedTime = moment(message.createdAt).format('HH:mm:ss');
  // get the inner html back
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();
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
