import { isLineCircleCollide } from './geography';

class Game {
  constructor(socket) {
    this.socket = socket;
    this.running = false;
    this.board = {
      ball: {
        x: 300,
        y: 100,
      },
      points: [
        {
          x: 0,
          y: 0,
        },
        {
          x: 300,
          y: 0,
        },
        {
          x: 300,
          y: 300,
        },
        {
          x: 0,
          y: 300,
        },
      ],
    };
  }

  updateGame() {
    this.board.ball.x += 1;
    this.board.points.forEach((point, index) => {
      const otherPoint = index === 0 ? this.board.points[this.board.points.length - 1] : this.board.points[index - 1];
      // const isColling = isLineCircleColliding(point.x, point.y, otherPoint.x, otherPoint.y, this.board.ball.x, this.board.ball.y, 5);
      const isColling = isLineCircleCollide([point.x, point.y], [otherPoint.x, otherPoint.y], [this.board.ball.x, this.board.ball.y], 5);
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

  hello() {
    console.log('hello');
  }
}


export default Game;
