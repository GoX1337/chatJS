    
var userName = "";

var socket = io.connect(window.location.href);

// On connection, the server send to user 'history' of last messages 
socket.on('init', function (data) {
   createNewNotif(data.nbUsers + " users are online");
   userName = data.username;
   $("#userName").html(userName);
   for(var i = 0; i < data.history.length; i++){
        createNewMsg(data.history[i].user, data.history[i].val);
   }
});

// A message received from the server (user sent then brodcasted to all)
socket.on('msg', function (data) {                
   createNewMsg(data.user, data.val);
});

// An other user joined
socket.on('newUser', function (data) {                
   createNewNotif(data +  " just connected");
});

// An other user left
socket.on('lostUser', function (data) {                
   createNewNotif(data +  " just left");
});

function send(){
    var msg = {};
    msg.val = $("#msgInput").val();
    msg.user = userName;
    socket.emit('msg', msg);
    createNewMsg(msg.user, msg.val);
    $("#msgInput").val("");
}

function closeModal(){
    userName = $("#userNameInput").val();
    $("#userName").html(userName);
    $('#myModal').modal('hide');
}

function createNewMsg(user, msg){
    $("#msgList").append('<li class="list-group-item"><span class="label label-default">' + user + '</span>     '+ msg + '</li>');
}

function createNewNotif(msg){
    $("#msgList").append('<li class="list-group-item">'+ msg + '</li>');
}