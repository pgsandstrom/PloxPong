import { expect } from 'chai';
import Game from '../src/game';

describe('game', () => {
  it('should be able to add lines', () => {
    const game = new Game(null);
    game.board.lines = [
      {
        a: {
          x: 10, y: 10,
        },
        b: {
          x: 300, y: 10,
        },
      }];
    game.changeToLineCount(4);
    for (let i = 0; i < 5000; i++) {
      game.updateGame();
    }
    game.board.lines.forEach((line) => {
      console.log(`${line.a.x} =>\t${line.b.x}\t\t${line.a.y} =>\t${line.b.y}`);
    });
    game.changeToLineCount(5);
    game.board.lines.forEach((line) => {
      console.log(`${line.a.x} =>\t${line.b.x}\t\t${line.a.y} =>\t${line.b.y}`);
    });
  });

  it('should be able to remove lines', () => {
    const game = new Game(null);
    game.board.lines = [
      {
        a: {
          x: 10, y: 10,
        },
        b: {
          x: 300, y: 10,
        },
      },
      {
        a: {
          x: 10, y: 10,
        },
        b: {
          x: 300, y: 10,
        },
      },
      {
        a: {
          x: 10, y: 10,
        },
        b: {
          x: 300, y: 10,
        },
      },
      {
        a: {
          x: 10, y: 10,
        },
        b: {
          x: 300, y: 10,
        },
      },
    ];
    game.changeToLineCount(4);
    // for (let i = 0; i < 5000; i++) {
    //   game.updateGame();
    // }
    // game.board.lines.forEach((line) => {
    //   console.log(`${line.a.x} =>\t${line.b.x}\t\t${line.a.y} =>\t${line.b.y}`);
    // });
  });
});
