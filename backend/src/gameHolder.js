import Game from './game';

// eslint-disable-next-line no-unused-vars
const playerStructure = {
  id: 'abc',
  name: 'Anon',
  socket: null,
  ready: false,
};

class GameHolder {
  constructor() {
    this.socketIdToPlayer = {};
    this.game = new Game(this);
  }

  startGame() {
    console.log('starting game...');
    this.game.start();
  }

  addPlayer(socket) {
    this.socketIdToPlayer[socket.id] = {
      id: socket.id,
      name: 'Anon',
      socket,
      ready: false,
    };
    this.game.addPlayer(socket.id);
    // if (this.getPlayerCount() === 1) {
    //   this.startGame();
    // }
    this.emitPlayerStatus();
  }

  ready(socket) {
    this.socketIdToPlayer[socket.id].ready = true;
    this.emitPlayerStatus();
  }

  unready(socket) {
    this.socketIdToPlayer[socket.id].ready = false;
    this.emitPlayerStatus();
  }

  setName(socket, name) {
    this.socketIdToPlayer[socket.id].name = name;
    this.emitPlayerStatus();
  }

  removePlayer(socket) {
    delete this.socketIdToPlayer[socket.id];
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
    return Object.keys(this.socketIdToPlayer).length;
  }

  emitPlayerStatus() {
    const playerList = Object.values(this.socketIdToPlayer).map(player => ({
      ...player,
      socket: undefined,
    }));
    Object.values(this.socketIdToPlayer).forEach(player => player.socket.emit('players', playerList));
  }

  emitBoard(board) {
    Object.values(this.socketIdToPlayer).forEach((player) => {
      player.socket.emit('board', board);
    });
  }
}

export default GameHolder;
