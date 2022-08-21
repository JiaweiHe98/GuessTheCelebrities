import React from 'react';
import PropTypes from 'prop-types';
import PlayerHistory from './PlayerHistory';
import Card from '../UI/Card';
import './UsersHistory.css';

// this is use to show all the players
const UsersHistory = ({ gameHistory, onDeleteHistory }) => {
  let bestScore = 'N/A';
  if (gameHistory.length > 0) {
    bestScore = gameHistory[0].maxpoints;
  }

  return (
    <Card className="usersHistory">
      <h2>
        All Players (Best Score
        {' '}
        {bestScore}
        )
      </h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Points</th>
            <th>Max Points</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {gameHistory.map((player, index) => (
            <PlayerHistory
              key={player.id}
              rank={index + 1}
              player={player}
              onDeleteHistory={onDeleteHistory}
            />
          ))}
        </tbody>
      </table>
    </Card>
  );
};

const playerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  maxpoints: PropTypes.number.isRequired,
};

UsersHistory.propTypes = {
  gameHistory: PropTypes.arrayOf(PropTypes.shape(playerShape)),
  onDeleteHistory: PropTypes.func.isRequired,
};

UsersHistory.defaultProps = {
  gameHistory: [],
};

export default UsersHistory;
