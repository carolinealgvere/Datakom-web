var bodyParser = require('body-parser');
var express = require('express');

var app = express();
var path = require('path');
var router =express.Router();
app.use(router);

app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
//app.set('views', __dirname + '/views');

var server = app.listen(8080);
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/seat',function(req,res){
//	console.log(req);
	res.send("HELLO");
})
app.post('/login',function(req,res){
	console.log(req.body);
	var bookingNumber = req.body.bnr;
	var name = req.body.tholder;
	if (name == "hej" && bookingNumber == "123"){
		res.render(__dirname +'/views/sida2', { 
			name: "Name: " + name, 
			bookingNumber: "Booking number: " + bookingNumber});
		//res.sendFile(__dirname + '/views/sida2.ejs');	
		//res.send(bookingNumber);
	}
	else{
		res.sendFile(__dirname +'/views/index.html');
	}
})





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



