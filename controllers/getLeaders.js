const getPlayers = require('./getPlayers');

const getLeaders = async (db, n) => {
  const leaders = await getPlayers(db);
  leaders.sort((a, b) => b.maxpoints - a.maxpoints || b.points - a.points);
  if (n > leaders.length) {
    return leaders;
  }
  return leaders.slice(0, n);
};

module.exports = getLeaders;
