var ioServ = require('socket.io');
var io = new ioServ();

var msgHisto = [];

// socket.io events
io.on('connection', function (socket) {
  console.log(new Date().toISOString()  + " Client connected");

  //send last 5 messages
  for(var i = 0; i<msgHisto.length;i++){
      //socket.broadcast.emit('msg', msgHisto[i]);
  }
  
  socket.on('msg', function (data) {
      socket.broadcast.emit('msg', data);
      //msgHisto.push(data);
      console.log(new Date().toISOString() + " " + data.user + ' : ' + data.val);
  });

  socket.on('disconnect', function () {
      console.log(new Date().toISOString()  + " Client disconnected");
  });
});

module.exports = io;
