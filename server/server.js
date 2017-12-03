const http = require('http'); // node-internal module
const path = require('path'); // node-internal module

const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');


//
// server
//
const port = process.env.PORT || 3000;
const app = express();

const server = http.createServer(app); // use http server instead of express to use socket.io
const io = socketIO(server); // enables this route with necessary front end JS: http://localhost:3000/socket.io/socket.io.js

//
// express middleware
//
// set up static directory
app.use(express.static(publicPath));

// register an event listener
io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('admin', 'Welcome to the chat app.'));

  socket.broadcast.emit('newMessage', generateMessage('admin', 'New user joined.'));

  // custom event listener
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);

    // emit an event to all connections
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server');
  });


  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('admin', coords.latitude, coords.longitude));
  });

  // disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected');

    socket.broadcast.emit('newMessage', generateMessage('admin', 'A user left. Good bye.'));
  });
});

//
// app server
//

/**
 * Starting the server
 * @param {String} port the server listens to
 * @param {function} callback for logging data to terminal
 */
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
