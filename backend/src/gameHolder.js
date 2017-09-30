import Game from './game';

const START_GAME_IMMEDIATLY = true;

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
    Object.values(this.socketIdToPlayer).forEach(player => player.socket.emit('start'));
    this.game.start();
  }

  addPlayer(socket) {
    this.socketIdToPlayer[socket.id] = {
      id: socket.id,
      name: 'Anon',
      socket,
      ready: true,
    };
    this.game.addPlayer(socket.id);
    this.emitPlayerStatus();
    if (START_GAME_IMMEDIATLY) {
      this.startGame();
    }
  }

  ready(socket) {
    this.socketIdToPlayer[socket.id].ready = true;
    this.emitPlayerStatus();
    if (Object.values(this.socketIdToPlayer).every(player => player.ready)) {
      this.startGame();
    }
  }

  unready(socket) {
    this.socketIdToPlayer[socket.id].ready = false;
    this.emitPlayerStatus();
  }

  setName(socket, name) {
    this.socketIdToPlayer[socket.id].name = name;
    this.emitPlayerStatus();
    this.game.setName(socket.id, name);
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
    this.game = new Game(this);
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
