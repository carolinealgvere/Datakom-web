var socket = io.connect('http://130.238.242.231:8080');
socket.on('connect', function(data) {
   socket.emit('join', 'Hello World from client');
});

/*var clickButton{

	var btn = document.createButton("loginButton");
	btm.setAttribute('onClick');
}*/