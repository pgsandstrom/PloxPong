import React from 'react';
import PropTypes from 'prop-types';

const ScoreList = props =>
  (<div>
    {props.players.map(player => <Player key={player.name} player={player} />)}
  </div>);
ScoreList.propTypes = {
  players: PropTypes.array.isRequired,
};

const Player = props => <div >{props.player.name} - {props.player.score}</div>;
Player.propTypes = {
  player: PropTypes.object.isRequired,
};

export default ScoreList;
