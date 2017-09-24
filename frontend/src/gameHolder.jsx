import React from 'react';
import PropTypes from 'prop-types';

import { createWebsocket, registerListener, getId, sendName, sendReady } from './websocket';

import Game from './game';

class GameHolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStarted: false,
      players: [],
    };
  }
  componentDidMount() {
    createWebsocket();
    registerListener('players', (players) => {
      console.log(`received players ${players.length}`);
      this.setState({
        players,
      });
    });
    registerListener('start', () => {
      this.setState({
        gameStarted: true,
      });
    });
  }

  render() {
    if (this.state.gameStarted) {
      return <Game />;
    } else {
      return <div className="playerList">{this.state.players.map(player => <Player key={player.id} player={player} />)}</div>;
    }
  }
}

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }
  handleUsernameChange(e) {
    sendName(e.target.value);
  }
  render() {
    const id = getId();
    let icon;
    if (this.props.player.ready) {
      icon = <i className="fa fa-check" aria-hidden="true" />;
    } else {
      icon = <i className="fa fa-times" aria-hidden="true" />;
    }
    if (this.props.player.id === id) {
      return (<div>
        <button onClick={() => sendReady(!this.props.player.ready)}>
          {icon}
        </button>
        <input
          name="username"
          placeholder="write your name already"
          onChange={this.handleUsernameChange}
          autoFocus
          className="standard-input"
        />
      </div>);
    } else {
      return (<div key={this.props.player.id} className="player">
        <button disabled>
          {icon}
        </button>
        <span>
          {this.props.player.name}
        </span>
      </div>);
    }
  }
}
Player.propTypes = {
  player: PropTypes.object.isRequired,
};

export default GameHolder;
