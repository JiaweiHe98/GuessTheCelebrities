const { ObjectId } = require('mongodb');

const deletePlayer = async (db, id) => {
  const deleted = await db.collection('Players').deleteOne({ _id: ObjectId(id) });
  return deleted;
};

module.exports = deletePlayer;
