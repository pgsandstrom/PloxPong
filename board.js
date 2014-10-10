var Board = function Board() {
	this.ball = new Ball();
	this.points = [];
	this.points.push(new Point(0, 0));
	this.points.push(new Point(0, 500));
	this.points.push(new Point(500, 500));
	this.points.push(new Point(500, 0));
};

Board.prototype.update = function () {
	this.points.forEach(function (point) {
		point.update();
	});
	this.ball.update();
};

Board.prototype.getJson = function () {
	var simple = {
		points: []
	};
	this.points.forEach(function (point) {
		simple.points.push({
			x: point.x,
			y: point.y});
	});
	simple.ball = {
		x: this.ball.x,
		y: this.ball.y};
	return JSON.stringify(simple);
};

var Point = function Point(x, y) {
	this.x = x;
	this.y = y;
	this.desiredX = x;
	this.desiredY = y;
};

Point.prototype.update = function () {

};

var Ball = function Ball(x, y, speedX, speedY) {
	this.x = x;
	this.y = y;
	this.speedX = speedX;
	this.speedY = speedY;
	if (this.x === undefined) {
		this.x = 250;
	}
	if (this.y === undefined) {
		this.y = 250;
	}
	if (this.speedX === undefined) {
		this.speedX = 5;
	}
	if (this.speedY === undefined) {
		this.speedY = 5;
	}
};

Ball.prototype.update = function () {
	//TODO studsa etc :(
	this.x += this.speedX;
	this.y += this.speedY;
};


var createBoard = function () {
	return new Board();
};

exports.createBoard = createBoard;