import Game from './game';

class GameHolder {
  constructor() {
    this.socketIdToSocket = {};
    this.game = new Game(this);
  }

  startGame() {
    this.game.start();
  }

  addPlayer(socket) {
    this.socketIdToSocket[socket.id] = socket;
    this.game.addPlayer(socket.id);
    if (this.getPlayerCount() === 1) {
      this.startGame();
    }
  }

  removePlayer(socket) {
    delete this.socketIdToSocket[socket.id];
    this.game.removePlayer(socket.id);
    if (this.getPlayerCount() === 0) {
      this.stopGame();
    }
  }

  stopGame() {
    this.game.stop();
  }

  updatePosition(socket, x, y) {
    this.game.updatePosition(socket.id, x, y);
  }

  getPlayerCount() {
    return Object.keys(this.socketIdToSocket).length;
  }

  emit(board) {
    Object.values(this.socketIdToSocket).forEach((socket) => {
      socket.emit('board', board);
    });
  }
}

export default GameHolder;
