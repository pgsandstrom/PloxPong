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
  });
});
