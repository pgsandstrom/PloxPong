var boardCreator = require('./board.js');

var Game = function Game(io) {
	this.io = io;
	this.players = 0;
	this.board = boardCreator.createBoard();
};

Game.prototype.addPlayer = function () {
	this.players++;
	if (this.players === 1) {
		this.startGame();
	}
};

Game.prototype.removePlayer = function () {
	this.players--;
};

Game.prototype.startGame = function () {
	this.tic();
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

var addPlayer = function (io) {
	if (game === undefined) {
		game = new Game(io);
	}
	game.addPlayer();
};

var removePlayer = function () {
	game.removePlayer();
	if (game.players === 0) {
		console.log("stopping game");
		game = undefined;
	}
};


exports.action = action;
exports.addPlayer = addPlayer;
exports.removePlayer = removePlayer;