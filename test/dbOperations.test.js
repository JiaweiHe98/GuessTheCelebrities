const dotenv = require('dotenv');
const connect = require('../controllers/connectToDatabase');
const getPlayers = require('../controllers/getPlayers');
const getPlayer = require('../controllers/getPlayer');
const addPlayer = require('../controllers/addPlayer');
const updatePlayer = require('../controllers/updatePlayer');
const deletePlayer = require('../controllers/deletePlayer');
const getLeaders = require('../controllers/getLeaders');

// LOAD CONFIG
dotenv.config({ path: './config.env' });

let db;

const clearDatabase = async () => {
  // try {
  await db.collection('Players').deleteOne({ name: 'testuser' });
  //   const { deleteCount } = result;
  //   if (deleteCount === 1) {
  //     console.log('testuser deleted successfully');
  //   } else {
  //     console.log('testuser failed to delete');
  //   }
  // } catch (err) {
  //   console.log('error', err.message);
  // }
};

beforeEach(async () => {
  db = await connect(process.env.DATABASE);
});

afterEach(async () => {
  await clearDatabase();
});

describe('Test database operations', () => {
  const testuser = {
    name: 'testuser',
    points: 0,
    maxpoints: 0,
  };

  test('add a new player', async () => {
    // db = await connect(process.env.DATABASE);
    await addPlayer(db, testuser);
    const inserted = await db.collection('Players').findOne({ name: 'testuser' });
    expect(inserted.name).toBe(testuser.name);
    expect(inserted.points).toBe(testuser.points);
    expect(inserted.maxpoints).toBe(testuser.maxpoints);
  });

  test('get all players', async () => {
    // db = await connect(process.env.DATABASE);
    await addPlayer(db, testuser);
    const allPlayers = await getPlayers(db);
    expect(allPlayers.find((el) => el.name === testuser.name)).not.toBe(undefined);
  });

  test('get user by id', async () => {
    // db = await connect(process.env.DATABASE);
    const added = await addPlayer(db, testuser);
    const player = await getPlayer(db, added.id);
    expect(player.name).toStrictEqual(testuser.name);
  });

  test('update player', async () => {
    // db = await connect(process.env.DATABASE);
    const added = await addPlayer(db, testuser);

    const newPlayer = {
      ...added,
      points: 10,
      maxpoints: 10,
    };
    const updated = await updatePlayer(db, newPlayer);
    expect(updated.points).toEqual(10);
  });

  test('delete player', async () => {
    // db = await connect(process.env.DATABASE);
    const added = await addPlayer(db, testuser);
    const deleted = await deletePlayer(db, added.id);
    expect(deleted.deletedCount).toBe(1);
  });

  test('get leaders', async () => {
    // db = await connect(process.env.DATABASE);
    const added = await addPlayer(db, testuser);
    const leaders = await getLeaders(db, 1000);
    expect(leaders.find((el) => el.name === added.name)).not.toBe(undefined);
    const onlyOne = await getLeaders(db, 1);
    expect(onlyOne).not.toBe(undefined);
  });
});
