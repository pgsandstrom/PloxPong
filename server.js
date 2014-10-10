var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var game = require('./game.js');

//Fult att servera saker såhär:
app.get('/', function (req, res) {
	res.sendfile('index.html');
});
app.get('/css/main.css', function (req, res) {
	res.sendfile('css/main.css');
});
app.get('/js/rendering.js', function (req, res) {
	res.sendfile('js/rendering.js');
});
//-------


io.on('connection', function (socket) {

	console.log("connection: " + socket.id);

	game.addPlayer(io);

//	socket.on('chat message', function (msg) {
//		io.emit('chat message', msg);
//	});
//
	socket.on('disconnect', function () {
		console.log("disconnect: " + socket.id);
		game.removePlayer();
	});
});


//-------
http.listen(3000, function () {
	console.log('listening on *:3000');
});