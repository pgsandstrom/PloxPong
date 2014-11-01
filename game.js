var boardCreator = require('./board.js');

var Game = function Game(io) {
	this.io = io;
	this.players = 0;
	this.board = boardCreator.createBoard();
};

Game.prototype.addPlayer = function (playerId) {
	this.players++;
	if (this.players === 1) {
		this.startGame();
	}
	this.board.addPlayer(playerId);
};

Game.prototype.removePlayer = function (playerId) {
	this.players--;
	this.board.removePlayer(playerId);
};

Game.prototype.startGame = function () {
	this.tic();
};

Game.prototype.updatePosition = function (playerId, position) {
	this.playerPositionMap[playerId] = position;
};

Game.prototype.tic = function () {
	console.log("tic");
	this.board.update();

	this.io.emit('update', this.board.getJson());

	var game = this; //TODO: necessary?
	setTimeout(function () {
		if (game.players > 0) {
			game.tic();
		} else {
			console.log("stopping tic");
		}
	}, 1000);
};

var game;

var action = function () {
	console.log("omg action");
};

var addPlayer = function (io, playerId) {
	if (game === undefined) {
		game = new Game(io);
	}
	game.addPlayer(playerId);
};

var removePlayer = function (playerId) {
	game.removePlayer(playerId);
	if (game.players === 0) {
		console.log("stopping game");
		game = undefined;
	}
};

var updatePosition = function (playerId) {
	game.removePlayer(playerId);

};


exports.action = action;
exports.addPlayer = addPlayer;
exports.removePlayer = removePlayer;
exports.updatePosition = updatePosition;