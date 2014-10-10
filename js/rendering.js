(function () {
	"use strict";
	var ploxpong = window.ploxpong = window.ploxpong || {};

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	ploxpong.render = function() {

		//fill with black:
		ctx.fillRect (0, 0, 500, 500);
		ctx.fill();

		ctx.fillStyle = "rgb(200,0,0)";
		ctx.fillRect (10.5, 10.5, 55, 50);

		ctx.beginPath();
		ctx.moveTo(75,50);
		ctx.lineTo(100,75);
		ctx.lineTo(100,25);
		ctx.fill();

		renderBoard(100);
	};

	var renderBoard = function(posY) {
		var posX = 450;
		var height = 50;
		var width = 10;
		var h = height / 2;
		var w = width / 2;
		ctx.fillStyle = "rgb(200,100,0)";
		ctx.beginPath();
		ctx.moveTo(posX - w ,posY - h);
		ctx.lineTo(posX + w ,posY - h);
		ctx.lineTo(posX + w ,posY + h);
		ctx.lineTo(posX - w ,posY + h);
		ctx.fill();
	};

	ploxpong.render();

})();
