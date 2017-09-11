import Game from './game';

const socketIdToGame = {};

export const startGame = (socket) => {
  // console.log(`starting ${socket.id}`);
  const game = new Game(socket);
  socketIdToGame[socket.id] = game;
  game.start();
};

export const stopGame = (socket) => {
  // console.log(`stopping ${socket.id}`);
  const game = socketIdToGame[socket.id];
  game.stop();
  socketIdToGame[socket.id] = {};
};

export const updatePosition = (socket, x, y) => {
  const game = socketIdToGame[socket.id];
  game.updatePosition(x,y);
};
