import { startGame, stopGame, updatePosition } from './gameHolder';

// const activeSockets = {};

export default (io) => {
  io.sockets.on('connection', (socket) => {
    console.log('connected');
    startGame(socket);

    // activeSockets[socket.id] = {};
    socket.on('position', (data) => {
      updatePosition(socket, data.x, data.y);
    });
    socket.on('disconnect', () => {
      console.log('disconnect');
      stopGame(socket);
    });
  });
};
