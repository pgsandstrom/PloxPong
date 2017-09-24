import React from 'react';
import PropTypes from 'prop-types';

import { createWebsocket, sendPosition } from './websocket';
import { getCanvas, renderBoard } from './render';
import ScoreList from './scoreList';
import Canvas from './canvas';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = { players: [] };
    this.onBoard = this.onBoard.bind(this);
  }
  componentDidMount() {
    console.log('componentDidMount');

    // TODO chill if too many events are created
    // TODO make the code not super ugly :)
    const rect = getCanvas().getBoundingClientRect();
    getCanvas().onmousemove = (e) => {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      sendPosition(x, y);
    };
    createWebsocket(this.onBoard);
  }
  onBoard(board) {
    renderBoard(board);
    const players = board.lines.filter(line => line.player)
      .map(line => line.player);
    this.setState({ players });
  }
  render() {
    return (<div>
      <Canvas />
      <ScoreList players={this.state.players} />
    </div>);
  }
}

export default Game;
