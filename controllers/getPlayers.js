const getPlayers = async (db) => {
  const players = await db.collection('Players').find({}).toArray();
  return players.map((el) => ({
    // eslint-disable-next-line no-underscore-dangle
    id: el._id, name: el.name, points: el.points, maxpoints: el.maxpoints,
  }));
};

module.exports = getPlayers;
