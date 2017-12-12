var bodyParser = require('body-parser');
var express = require('express');
var session = require('express-session');
var mysql = require('mysql');
var app = express();
var path = require('path');
var router =express.Router();
var passport = require('passport'), 
LocalStrategy = require('passport-local').Strategy;
app.use(router);
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
//app.set('views', __dirname + '/views');

var server = app.listen(8080);
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//brew services start mysql
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

con.connect(function(err) {
  if (err) throw err;
});


app.use(session({
	secret: 'mySecret',
	resave: false,
	saveUninitalized: true,
	//cookie: {maxAge: 600000}

}))

 // app.use(express.cookieParser());
  //app.use(express.bodyParser());
  //app.use(express.cookieSession()); 
  app.use(passport.initialize());  
  app.use(passport.session());


app.get('/seat',function(req,res){
//	console.log(req);
	res.send("HELLO");
})

app.post('/login',function(req,res){


	var bookingNumber = req.body.bnr;
	var name = req.body.tholder;

	var seat = "You have not selected a seat yet";
	var sql = 'SELECT * FROM sys.UsersSeats WHERE fullName = ? AND bookingNumber = ?';
	//req.session.username = name;
	//console.log(req.session);
	con.query(sql, [name, bookingNumber], function (err, result, fields) {
    if (err) throw err;
    console.log(result[0].seat);

    if(result[0].seat != 0){
    	seat = result[0].seat;
    }

    if(!result.length){
		res.sendFile(__dirname +'/views/index.html');
    }
    else{
    	var sess = req.session;
		req.session.user = name;
		req.session.bookingNumber = bookingNumber;
		console.log(req.session.user);
		console.log(req.session.bookingNumber);
		res.render(__dirname +'/views/sida2', { 
			name: "Name: " + req.session.user, 
			bookingNumber: "Booking number: " + req.session.bookingNumber,
			seat: seat,
			OBS: ""

		});
			
    }	
  });
})



app.post('/seatSelected', function(req,res){
	
	console.log(req.session.user);
	var seat = req.body.seat;
	//console.log(req.body.seat);
	var sql1 = 'SELECT * FROM sys.UsersSeats WHERE seat =?';
	var OBS = "OBS! You have selected a seat which requires you to open emergency doors in case of energancy. Hence if you are traveling with child, have a disability etc. please select a new seat.";
	con.query(sql1, [seat, 0],function (err,result,fields){
		if (err) throw err;


	if(!result.length){
		var sql3 = "UPDATE sys.UsersSeats SET seat = ? WHERE fullName = ?";
		con.query(sql3, [seat,req.session.user] , function(err, result){
			if (err) throw err;
		});		
		//Check if seat has special needs
		if(seat.charAt(1) == 1 && (seat.charAt(2) == (3||4||5))){
			res.render(__dirname +'/views/sida2', {

				name: "Name: " + req.session.user, 
				bookingNumber: "Booking number: " + req.session.bookingNumber,
				seat:"Your seat is: "+ seat,
				OBS : ""+OBS
			});
		}
		else{
			res.render(__dirname +'/views/sida2', {

				name: "Name: " + req.session.user, 
				bookingNumber: "Booking number: " + req.session.bookingNumber,
				seat:"Your seat is: "+ seat,
				OBS : ""
			});	
		}

	}
	else{
		console.log("Seat alredy taken");

		res.sendFile(__dirname +'/views/flygplan.html');
	}
	});
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



