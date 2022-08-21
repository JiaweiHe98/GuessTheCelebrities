const { ObjectId } = require('mongodb');

const updatePlayer = async (db, player) => {
  await db
    .collection('Players')
    .updateOne(
      { _id: ObjectId(player.id) },
      {
        $set: {
          name: String(player.name),
          points: player.points,
          maxpoints: player.maxpoints,
        },
      },
    );
  const updated = await db.collection('Players').findOne({ _id: ObjectId(player.id) });
  return { id: updated.id, points: updated.points, maxpoints: updated.maxpoints };
};

module.exports = updatePlayer;
