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
    game.changeToLineCount(8);
    // console.log(game.board.lines[0].b.x);
    // console.log(game.board.lines[0].b.y);
    game.board.lines.forEach((line) => {
      // console.log(`${line.a.x},${line.a.y} - ${line.b.x},${line.b.y}`);
      console.log(`${line.a.x} =>\t${line.b.x}\t\t${line.a.y} =>\t${line.b.y}`);
    });
  });
});
