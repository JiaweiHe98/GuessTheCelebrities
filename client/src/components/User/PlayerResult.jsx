import React from 'react';
import PropTypes from 'prop-types';
import './PlayerResult.css';
import Card from '../UI/Card';
import Button from '../UI/Button';

// this is only for the end of the game!
export default function PlayerResult({ player, playAgain }) {
  return (
    <Card className="playerResult">
      <div>
        <h1>
          {player.name}
          {'\'s '}
          Current Score:
          {' '}
          {player.points}
          , Best Score:
          {' '}
          {player.maxpoints}
        </h1>
      </div>
      <div className="action">
        <Button onClick={playAgain}>Play Again</Button>
      </div>
    </Card>
  );
}

const playerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  maxpoints: PropTypes.number.isRequired,
};

PlayerResult.propTypes = {
  player: PropTypes.shape(playerShape).isRequired,
  playAgain: PropTypes.func.isRequired,
};
