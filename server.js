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
app.get('/js/gameLocal.js', function (req, res) {
	res.sendfile('js/gameLocal.js');
});
//-------


io.on('connection', function (socket) {
	var playerId = socket.id;


	console.log("connection: " + playerId);

	game.addPlayer(io, playerId);

	socket.on('position', function (position) {
//		console.log('position: ' + position);
		game.updatePosition(playerId, position);
	});
//
	socket.on('disconnect', function () {
		console.log("disconnect: " + playerId);
		game.removePlayer(playerId);
	});
});


//-------
http.listen(3000, function () {
	console.log('listening on *:3000');
});