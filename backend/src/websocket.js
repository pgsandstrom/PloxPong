/* eslint-disable no-console */
import GameHolder from './gameHolder';

const activeSockets = {};
const gameHolder = new GameHolder();

export default (io) => {
  io.sockets.on('connection', (socket) => {
    console.log(`connected ${socket.id}`);
    // gameHolder.startGame();
    gameHolder.addPlayer(socket);

    activeSockets[socket.id] = {};
    socket.on('ready', (data) => {
      gameHolder.ready(socket, data.x, data.y);
    });
    socket.on('unready', (data) => {
      gameHolder.unready(socket, data.x, data.y);
    });
    socket.on('name', (data) => {
      gameHolder.setName(socket, data.name);
    });
    socket.on('position', (data) => {
      gameHolder.updatePosition(socket, data.x, data.y);
    });
    socket.on('disconnect', () => {
      delete activeSockets[socket.id];
      console.log('disconnect');
      gameHolder.removePlayer(socket);
      // gameHolder.stopGame();
    });
  });
};
