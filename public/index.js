var userName = "Guest";

var socket = io.connect(window.location.href);

socket.on('msg', function (data) {                
   $("#msgList").append('<li class="list-group-item"><span class="label label-default">' + userName + '</span>     '+ data + '</li>');
});

function send(){
    var msg = $("#msgInput").val();
    socket.emit('msg', msg);
    $("#msgList").append('<li class="list-group-item"><span class="label label-default">' + userName + '</span>     '+ msg + '</li>');
    $("#msgInput").val("");
}
