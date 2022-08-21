import React from 'react';
import PropTypes from 'prop-types';
import Button from '../UI/Button';
import './PlayerHistory.css';

export default function PlayerHistory({
  rank, player, onDeleteHistory,
}) {
  const onClickDeleteHandler = () => {
    onDeleteHistory(player);
  };

  return (
    <tr>
      <td>
        {rank}
      </td>
      <td>
        {player.name}
      </td>
      <td>
        {player.points}
      </td>
      <td>
        {player.maxpoints}
      </td>
      <td>
        <Button onClick={onClickDeleteHandler}>
          Delete
        </Button>
      </td>
    </tr>
  );
}

const playerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  maxpoints: PropTypes.number.isRequired,
};

PlayerHistory.propTypes = {
  rank: PropTypes.number.isRequired,
  player: PropTypes.shape(playerShape).isRequired,
  onDeleteHistory: PropTypes.func.isRequired,
};
