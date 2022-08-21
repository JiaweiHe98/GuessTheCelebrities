const addPlayer = async (db, newPlayer) => {
  // try {
  const toInsert = {
    name: String(newPlayer.name),
    points: newPlayer.points,
    maxpoints: newPlayer.maxpoints,
  };
  const result = await db.collection('Players').insertOne(toInsert);
  return {
    id: result.insertedId,
    name: newPlayer.name,
    points: newPlayer.points,
    maxpoints: newPlayer.maxpoints,
  };
  // } catch (err) {
  //   // eslint-disable-next-line no-console
  //   console.log(`error: ${err.message}`);
  //   return null;
  // }
};

module.exports = addPlayer;
