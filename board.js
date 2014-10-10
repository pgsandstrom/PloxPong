var Board = function Board() {
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
};

Board.prototype.getJson = function () {
	var simple = [];
	this.points.forEach(function (point) {
		simple.push({
			x: point.x,
			y: point.y});
	});
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


var createBoard = function () {
	return new Board();
};

exports.createBoard = createBoard;