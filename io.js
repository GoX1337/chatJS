var ioServ = require('socket.io');
var io = new ioServ();

var msgHisto = [];

io.on('connection', function (socket) {
  console.log("client connected");

  //send last 5 messages
  for(var i = 0; i<msgHisto.length;i++){
      socket.broadcast.emit('msg', msgHisto[i]);
  }
  
  socket.on('msg', function (data) {
      socket.broadcast.emit('msg', data);
      msgHisto.push(data);
      console.log('msg received and broadcasted : ' + data);
  });

  socket.on('disconnect', function () {
      console.log("client disconnect");
  });
});

module.exports = io;
