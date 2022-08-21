const { MongoClient } = require('mongodb');

const connect = async (url) => {
  try {
    const db = (await MongoClient.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
    )).db();
    // eslint-disable-next-line no-console
    console.log('Scuessfully connet to database!');
    return db;
  } catch (err) {
    throw new Error(`Could not connect to MongoDB database: ${err.message}`);
  }
};

module.exports = connect;
