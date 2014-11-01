(function () {
	"use strict";
//	var ploxpong = window.ploxpong = window.ploxpong || {};
//
//	ploxpong.rofl = function (board) {
//
//	};
//
//	var blah = function () {
//
//	};

	var y = 100;

	var socket = io();

	var repeater = function () {
		setTimeout(function () {
			console.log("repeater sending " + y);
			socket.emit('position', y);
			repeater();
		}, 1000);
	};
	repeater();

	$("#canvas").mousemove(function (event) {
//		console.log("plox: " + event.pageY);
		y = event.pageY;
	});

})();