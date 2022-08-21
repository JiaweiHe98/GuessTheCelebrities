const dotenv = require('dotenv');
const request = require('supertest');
const connect = require('../controllers/connectToDatabase');
const app = require('../server');

// LOAD CONFIG
dotenv.config({ path: './config.env' });

let db;

const clearDatabase = async () => {
  await db.collection('Players').deleteOne({ name: 'testuser' });
};

beforeEach(async () => {
  db = await connect(process.env.DATABASE);
});

afterEach(async () => {
  clearDatabase();
});

// const testuser = {
//   name: 'testuser',
//   points: 0,
//   maxpoints: 0,
// };

describe('test server', () => {
  test('missing points', () => {
    request(app).post('/missing-point').send('no-user')
      .expect(404)
      .then((res) => {
        expect(JSON.parse(res.text).error).toBe('no such route!');
      });
  });

  test('add a new player', () => {
    request(app).post('/player').send('name=testuser&points=0&maxpoints=0')
      .expect(201)
      .then((res) => {
        expect(JSON.parse(res.text).name).toBe('testuser');
      });
  });

  test('get all players', () => {
    request(app).post('/player').send('name=testuser&points=0&maxpoints=0')
      .then(() => {
        request(app).get('/players')
          .expect(200)
          .then((res) => {
            expect(JSON.parse(res.text).find((el) => el.name === 'testuser')).not.toBe(undefined);
          });
      });
  });

  test('get player by id', () => {
    request(app).post('/player').send('name=testuser&points=0&maxpoints=0')
      .then((res) => JSON.parse(res.text).id)
      .then((id) => {
        request(app).get(`/player/${id}`)
          .then((res) => {
            expect(JSON.parse(res.text).name === 'testuser');
          });
      });
  });

  test('update player', async () => {
    const addedPlayer = await request(app).post('/player').send('name=testuser&points=0&maxpoints=0');
    const { id } = JSON.parse(addedPlayer.text);
    const updated = await request(app).put(`/player/${id}`).send('name=testuser&points=10&maxpoints=10').expect(200);
    expect(+JSON.parse(updated.text).points).toBe(10);

    // error
    await request(app).put('/player/123').send('name=testuser&points=10&maxpoints=10').expect(404);
  });

  test('delete player', async () => {
    const addedPlayer = await request(app).post('/player').send('name=testuser&points=0&maxpoints=0');
    const { id } = JSON.parse(addedPlayer.text);
    const result = await request(app).delete(`/player/${id}`).expect(200);
    expect(+JSON.parse(result.text).deleteCount === 1);

    // error
    const errRes = await request(app).delete('/player/123').expect(404);
    expect(JSON.parse(errRes.text).error).not.toBe(undefined);
  });

  test('get leaders', async () => {
    await request(app).post('/player').send('name=testuser&points=0&maxpoints=0');
    const result = await request(app).get('/leaders/10');
    expect(JSON.parse(result.text)).not.toBe(undefined);

    // error
    const errRes = await request(app).get('/leaders').expect(404);
    expect(JSON.parse(errRes.text).error).toBe('no such route!');
  });
});
