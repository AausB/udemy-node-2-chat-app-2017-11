const http = require('http'); // node-internal module
const path = require('path'); // node-internal module

const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');


//
// server
//
const port = process.env.PORT || 3000;
const app = express();

const server = http.createServer(app); // use http server instead of express to use socket.io
const io = socketIO(server); // enables this route with necessary front end JS: http://localhost:3000/socket.io/socket.io.js


const users = new Users();

//
// express middleware
//
// set up static directory
app.use(express.static(publicPath));

// register an event listener
io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room are required')
    }

    // console.log(socket.id); // each socket has its own id

    socket.join(params.room); // joining a room
    users.removeUser(socket.id); // remove a user just in case
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    // io.emit -> io.to('The Office fans') emit to a room
    // socket.broadcast.emit -> socket.broadcast.to('The Office fans')
    // socket.emit remains as it is

    // emitting to a single user
    socket.emit('newMessage', generateMessage('admin', `Hi ${params.name}. Welcome to the chat app.`));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('admin', `${params.name} has joined the room.`));

    callback(); // the OK path for the caller
  });

  // custom event listener
  socket.on('createMessage', (message, callback) => {
    let user = users.getUser(socket.id);

    if (user && isRealString(message.text)) {
      // emit an event to all connections
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }

    callback();
  });


  socket.on('createLocationMessage', (coords) => {
    let user = users.getUser(socket.id);

    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  // disconnect
  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('admin', `${user.name} has left`));
      console.log(`User "${user.name}" disconnected from room ${user.room}`);
    }

    // socket.broadcast.emit('newMessage', generateMessage('admin', 'A user left. Good bye.'));
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
