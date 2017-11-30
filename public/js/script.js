var socket = io.connect('http://130.238.244.141:3000');
socket.on('connect', function(data) {
   socket.emit('join', 'Hello World from client');
});