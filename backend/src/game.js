import { isLineCircleCollide } from './geography';

class Game {
  constructor(socket) {
    this.socket = socket;
    this.running = false;
    this.board = {
      ball: {
        x: 250,
        y: 100,
        velocity: [1, 0],
      },
      lines: [
        [[
          0, 0,
        ], [
          300, 0,
        ]],
        [[
          300, 0,
        ], [
          300, 300,
        ]],
        [[
          300, 300,
        ], [
          0, 300,
        ]],
        [[
          0, 300,
        ], [
          0, 0,
        ]],
      ],
    };
  }

  updateGame() {
    this.board.ball.x += this.board.ball.velocity[0];
    this.board.ball.y += this.board.ball.velocity[1];
    this.board.lines.forEach((line) => {
      const isColling = isLineCircleCollide(line[0], line[1], [this.board.ball.x, this.board.ball.y], 5);
      if (isColling) {
        console.log('omg collide');
      } else {
        // console.log('NOOOO omg collide');
      }
    });
  }

  sendUpdate() {
    this.socket.emit('board', this.board);
  }

  start() {
    console.log('start');
    this.running = true;
    this.cycle();
  }

  cycle() {
    this.updateGame();
    this.sendUpdate();
    setTimeout(() => {
      // console.log('cycle timeout');
      if (this.running) {
        this.cycle();
      } else {
        console.log('finished');
      }
    }, 33);
  }

  stop() {
    this.running = false;
  }
}


export default Game;
