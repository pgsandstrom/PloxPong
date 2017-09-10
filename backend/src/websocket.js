import { startGame, stopGame } from './gameHolder';

// const activeSockets = {};

export default (io) => {
  io.sockets.on('connection', (socket) => {
    console.log('connected');
    startGame(socket);

    // activeSockets[socket.id] = {};
    // socket.on('setId', (data) => {
    //   socket.emit('load', data);
    // });
    socket.on('disconnect', () => {
      console.log('disconnect');
      stopGame(socket);
    });
  });
};
