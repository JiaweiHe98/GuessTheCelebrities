const { ObjectId } = require('mongodb');

const getPlayer = async (db, id) => {
  const player = await db.collection('Players').findOne({ _id: ObjectId(id) });
  return {
    // eslint-disable-next-line no-underscore-dangle
    id: player._id, name: player.name, points: player.points, maxpoints: player.maxpoints,
  };
};

module.exports = getPlayer;
