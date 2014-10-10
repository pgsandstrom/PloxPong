var boardCreator = require('./board.js');

var Game = function Game() {
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

	var game = this; //TODO: necessary?
	setTimeout(function () {
		if (game.players > 0) {
			game.tic();
		} else {
			console.log("stopping tic");
		}
	}, 100);
};

var game;

var action = function () {
	console.log("omg action");
};

var addPlayer = function () {
	if (game === undefined) {
		game = new Game();
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