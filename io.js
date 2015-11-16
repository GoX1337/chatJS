var ioServ = require('socket.io');
var history = require('./history.js');
var io = new ioServ();

var msgHisto = [];

// socket.io events
io.on('connection', function (socket) {
  console.log(new Date().toISOString()  + " Client connected");
  
  // send the history of last messages to the client
  socket.emit("history", history.getHisto());
  
  // a client sent a message, we brodcast it to everyone
  socket.on('msg', function (data) {
      socket.broadcast.emit('msg', data);
      history.push(data);
      console.log(new Date().toISOString() + " " + data.user + ' : ' + data.val);
  });

  // a client disconnect 
  socket.on('disconnect', function () {
      console.log(new Date().toISOString()  + " Client disconnected");
  });
});

module.exports = io;
