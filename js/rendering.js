(function () {
	"use strict";
	var ploxpong = window.ploxpong = window.ploxpong || {};

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	ploxpong.render = function (board) {

		//fill with black:
		ctx.fillRect(0, 0, 500, 500);
		ctx.fill();

		if (board !== undefined) {
			renderPoints(board.points);
			renderBall(board.ball);
		}
//		ctx.fillStyle = "rgb(200,0,0)";
//		ctx.fillRect (10.5, 10.5, 55, 50);
//
//		ctx.beginPath();
//		ctx.moveTo(75,50);
//		ctx.lineTo(100,75);
//		ctx.lineTo(100,25);
//		ctx.fill();
//
//		renderBoard(100);
	};

	var renderPoints = function (points) {
		var first = true;
		points.forEach(function (point) {
			if (first) {
				ctx.fillStyle = "rgb(200,0,0)";
				ctx.beginPath();
				ctx.moveTo(point.x, point.y);
			} else {
				ctx.lineTo(point.x, point.y);
			}
		});
//		ctx.fill();
	};

	var renderBall = function (ball) {

	};


//	var renderBoard = function(posY) {
//		var posX = 450;
//		var height = 50;
//		var width = 10;
//		var h = height / 2;
//		var w = width / 2;
//		ctx.fillStyle = "rgb(200,100,0)";
//		ctx.beginPath();
//		ctx.moveTo(posX - w ,posY - h);
//		ctx.lineTo(posX + w ,posY - h);
//		ctx.lineTo(posX + w ,posY + h);
//		ctx.lineTo(posX - w ,posY + h);
//		ctx.fill();
//	};

	ploxpong.render();

})();
