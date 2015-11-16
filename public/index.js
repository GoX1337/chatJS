var userName = "Guest";

var socket = io.connect(window.location.href);

$("#userName").html(userName);

// A message received from the server (user sent then brodcasted to all)
socket.on('msg', function (data) {                
   $("#msgList").append('<li class="list-group-item"><span class="label label-default">' + data.user + '</span>     '+ data.val + '</li>');
});

// On connection, the server send to user 'history' of last messages 
socket.on('history', function (data) {                
   for(var i = 0; i < data.length; i++){
        $("#msgList").append('<li class="list-group-item"><span class="label label-default">' + data[i].user + '</span>     '+ data[i].val + '</li>');
   }
});

function send(){
    var msg = {};
    msg.val = $("#msgInput").val();
    msg.user = userName;
    socket.emit('msg', msg);
    $("#msgList").append('<li class="list-group-item"><span class="label label-default">' + msg.user + '</span>     '+ msg.val + '</li>');
    $("#msgInput").val("");
}

function closeModal(){
    userName = $("#userNameInput").val();
    $("#userName").html(userName);
    $('#myModal').modal('hide');
}
