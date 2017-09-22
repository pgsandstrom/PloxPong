/* eslint-disable no-param-reassign,no-console */

import {
  bounceCircle,
  isLineIntersectingCircle,
  pointOnLineClosestToCircle,
  dotToDotDistance,
} from './trig';

class Game {
  constructor(socket) {
    this.socket = socket;
    this.running = false;
    this.msBetweenFrame = 15;
    this.speed = 5;
    this.startTime = null;
    this.turn = 0;
    this.board = {
      ball: {
        center: {
          x: 250.01,
          y: 100.01,
        },
        radius: 5,
        velocity: { x: 1, y: 0 },
      },
      lines: [
        {
          player: {
            a: {
              x: 30, y: 0,
            },
            b: {
              x: 30, y: 30,
            },
          },
          a: {
            x: 0, y: 0,
          },
          b: {
            x: 300, y: 0,
          },
        },
        {
          a: {
            x: 300, y: 0,
          },
          b: {
            x: 300, y: 300,
          } },
        {
          a: {
            x: 300, y: 300,
          },
          b: {
            x: 0, y: 300,
          },
        },
        {
          a: {
            x: 0, y: 300,
          },
          b: {
            x: 0, y: 0,
          },
        },
      ],
    };
  }

  updateGame() {
    const ball = this.board.ball;
    ball.center.x += ball.velocity.x;
    ball.center.y += ball.velocity.y;
    this.board.lines.forEach((line) => {
      const yDiff = (line.b.y - line.a.y);
      const xDiff = (line.b.x - line.a.x);
      line.angle = Math.atan(yDiff / xDiff);
      line.len = Math.sqrt((yDiff * yDiff) + (xDiff * xDiff));
      line.center = {};
      line.center.x = line.a.x;
      line.center.y = line.a.y;

      bounceCircle(ball, line);
    });

    const player = this.board.lines[0].player;
    this.checkPlayerCollision(ball, player);
  }

  checkPlayerCollision(ball, player) {
    if (isLineIntersectingCircle(ball, player)) {
      const closestPoint = pointOnLineClosestToCircle(ball, player);
      isLineIntersectingCircle(ball, player);
      const distanceToPlayerLeft = dotToDotDistance(closestPoint, player.a);
      const playerLength = dotToDotDistance(player.a, player.b);
      let percentage = distanceToPlayerLeft / playerLength;
      percentage = Math.min(percentage, 0.8);
      percentage = Math.max(percentage, 0.2);
      let playerDegree = Math.atan2(player.b.y - player.a.y, player.b.x - player.a.x);
      if (playerDegree < 0) {
        playerDegree += Math.PI * 2;
      }
      playerDegree += (Math.PI * percentage) + Math.PI;

      const xForce = Math.cos(playerDegree);
      const yForce = Math.sin(playerDegree);
      ball.velocity.x = xForce;
      ball.velocity.y = yForce;
    }
  }

  updatePosition(x, y) {
    const player = this.board.lines[0].player;
    player.a.y = y;
    player.b.y = y + 30;
  }

  sendUpdate() {
    this.socket.emit('board', this.board);
  }

  start() {
    console.log('start');
    this.startTime = Date.now();
    this.running = true;
    this.cycle();
  }

  cycle() {
    this.turn += 1;
    let cycles = this.speed;
    while (cycles > 0) {
      this.updateGame();
      cycles -= 1;
    }

    this.sendUpdate();

    const currentTime = Date.now();
    const nextTime = this.startTime + (this.turn * this.msBetweenFrame);
    const sleepTime = nextTime - currentTime;

    setTimeout(() => {
      if (this.running) {
        this.cycle();
      } else {
        console.log('finished');
      }
    }, sleepTime);
  }

  stop() {
    this.running = false;
  }
}


export default Game;
