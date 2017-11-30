var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/node_modules'));


console.log("ABO");

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connect', newConnection);

function newConnection(socket) {
    console.log('new connection: ' + socket.id);

    socket.on('mouse', mouseMsg);

    function mouseMsg(data) {
        socket.broadcast.emit('mouse', data);
        console.log(data);
    }

}



