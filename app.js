var bodyParser = require('body-parser');
var express = require('express');
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
	var sql = 'SELECT * FROM sys.Users WHERE fullName = ? AND bookingNumber = ?';
	//req.session.username = name;
	//console.log(req.session);
	con.query(sql, [name, bookingNumber], function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    if(!result.length){
		res.sendFile(__dirname +'/views/index.html');
    }
    else{
		res.render(__dirname +'/views/sida2', { 
			name: "Name: " + name, 
			bookingNumber: "Booking number: " + bookingNumber,
			seat: seat,
			OBS: ""

		});
			
    }	
  });
})



app.post('/seatSelected', function(req,res){
	
	var seat = req.body.seat;
	console.log(seat.charAt(0));
	console.log(seat.charAt(1));
	console.log(seat.charAt(2));
	console.log(req.body.seat);
	var sql1 = 'SELECT * FROM sys.Seats WHERE seat =? AND Taken =?';
	var OBS = "OBS! You have selected a seat which requires you to open emergency doors in case of energancy. Hence if you are traveling with child, have a disability etc. please select a new seat.";
	con.query(sql1, [seat, 0],function (err,result,fields){
		if (err) throw err;

		console.log(result);
	/* Ändringar som behövs
	1. Vi måste lägga till så att den förra stolen personen satt på ändras tillbaka till Taken=0 och bookingnumber = null
	2. Vi måste lägga till så att det är den inloggade personens bokningsnummer som läggs in och inte "1000"
	*/
	if(result.length){
		var sql2 = "UPDATE sys.Seats SET bookingNumber = ? WHERE seat = ?";
		con.query(sql2, [1000,seat] , function(err, result){
			if (err) throw err;
		});

	var sql3 = "UPDATE sys.Seats SET Taken = ? WHERE seat = ?";
	con.query(sql3, [1,seat] , function(err, result){
		if (err) throw err;
	});
		if(seat.charAt(1) == 1 && (seat.charAt(2) == (3||4||5))){
			res.render(__dirname +'/views/sida2', {

				name:"funkar inte",
				bookingNumber:"funkar inte",
				seat:"Your seat is: "+ seat,
				OBS : ""+OBS
			});
		}
		else{
			res.render(__dirname +'/views/sida2', {

				name:"funkar inte",
				bookingNumber:"funkar inte",
				seat:"Your seat is: "+ seat,
				OBS :""
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



