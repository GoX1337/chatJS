var ioServ = require('socket.io');
var history = require('./history.js');
var guestId = require('./guestId.js');
var io = new ioServ();

var nbUserConnected = 0;
var users = [];

// socket.io events
io.on('connection', function (socket) {
  
  var username = "Guest-" + guestId.getNewGuestId();
  
  var initObj = {
    username: username,
    history: history.getHisto(),
    nbUsers: nbUserConnected
  }
  
  console.log(new Date().toISOString()  + " " + username + " just connected");
  
  nbUserConnected++;
  socket.username = username;
  users.push(socket);
  
  // send the history of last messages to the user
  socket.emit("init", initObj);
  
  // brodcast to everyone someone just connected
  socket.broadcast.emit('newUser', initObj.username);
  
  // an user sent a message, we broadcast it to everyone
  socket.on('msg', function (data) {
      socket.broadcast.emit('msg', data);
      history.push(data);
      console.log(new Date().toISOString() + " " + data.user + ' : ' + data.val);
  });

  // an user disconnected
  socket.on('disconnect', function () {
      console.log(new Date().toISOString()  + " " + socket.username + " disconnected");
      socket.broadcast.emit('lostUser', socket.username);
      nbUserConnected--;
  });
});

module.exports = io;
