/* eslint-disable no-param-reassign */

// import { isLineCircleCollide } from './geography';
import { bounceCircle } from './trig';

class Game {
  constructor(socket) {
    this.socket = socket;
    this.running = false;
    this.msBetweenFrame = 15;
    this.speed = 10;
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
        { a: {
          x: 0, y: 0,
        },
        b: {
          x: 300, y: 0,
        } },
        { a: {
          x: 300, y: 0,
        },
        b: {
          x: 300, y: 300,
        } },
        { a: {
          x: 300, y: 300,
        },
        b: {
          x: 0, y: 300,
        } },
        { a: {
          x: 0, y: 300,
        },
        b: {
          x: 0, y: 0,
        } },
      ],
    };
  }

  updateGame() {
    this.board.ball.center.x += this.board.ball.velocity.x;
    this.board.ball.center.y += this.board.ball.velocity.y;
    this.board.lines.forEach((line) => {
      // const isColling = isLineCircleCollide(line[0], line[1], [this.board.ball.x, this.board.ball.y], 5);
      const yDiff = (line.b.y - line.a.y);
      const xDiff = (line.b.x - line.a.x);
      line.angle = Math.atan(yDiff / xDiff);
      line.len = Math.sqrt((yDiff * yDiff) + (xDiff * xDiff));
      line.center = {};
      line.center.x = line.a.x;
      line.center.y = line.a.y;

      bounceCircle(this.board.ball, line);
      // if (isColling) {
      //   console.log('omg collide');
      // } else {
      // console.log('NOOOO omg collide');
      // }
    });
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
