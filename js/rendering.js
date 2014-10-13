(function () {
	"use strict";
	var ploxpong = window.ploxpong = window.ploxpong || {};

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	ploxpong.render = function (board) {

		//fill with black:
		ctx.fillStyle = "rgb(0,0,0)";
		ctx.fillRect(0, 0, 500, 500);
		ctx.fill();

		if (board !== undefined) {
			renderPoints(board.points);
			renderBall(board.ball);
		}
	};

	var renderPoints = function (points) {
		var first = true;
		points.forEach(function (point) {
			if (first) {
				ctx.fillStyle = "rgb(255,255,255)";
				ctx.beginPath();
				ctx.moveTo(point.x, point.y);
				first = false;
			} else {
				ctx.lineTo(point.x, point.y);
			}
		});
		ctx.fill();
	};

	var renderBall = function (ball) {
		ctx.beginPath();
		ctx.arc(ball.x, ball.y, 5, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'green';
		ctx.fill();
//		ctx.lineWidth = 5;
//		ctx.strokeStyle = '#003300';
//		ctx.stroke();
	};

	ploxpong.render();

})();
