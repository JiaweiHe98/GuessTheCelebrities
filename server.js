// Create express app
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connect = require('./controllers/connectToDatabase');
const getPlayers = require('./controllers/getPlayers');
const getPlayer = require('./controllers/getPlayer');
const addPlayer = require('./controllers/addPlayer');
const updatePlayer = require('./controllers/updatePlayer');
const deletePlayer = require('./controllers/deletePlayer');
const getLeaders = require('./controllers/getLeaders');

// LOAD CONFIG
dotenv.config({ path: './config.env' });

const webapp = express();
let db;

webapp.use(cors());

webapp.use(express.json());
webapp.use(
  express.urlencoded({
    extended: true,
  }),
);

webapp.use(express.static(path.join(__dirname, '/client/build')));

// Root endpoint
// TODO: Will need to alter this for deployment
// webapp.get('/', (_req, res) => {
//   res.json({ message: 'Welcome to HW4 Backend' });
// });

// TODO: define all endpoints as specified in REST API

// GET ALL PLAYERS
webapp.get('/players', async (_req, res) => {
  try {
    const players = await getPlayers(db);
    res.status(200).json(players);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// GET PLAYER BY ID
webapp.get('/player/:id', async (req, res) => {
  try {
    if (req.params.id === undefined) {
      res.status(404).json({ error: 'id is missing!' });
      return;
    }
    const player = await getPlayer(db, req.params.id);
    res.status(200).json(player);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// ADD A NEW PLAYER
webapp.post('/player', async (req, res) => {
  try {
    const newPlayer = await addPlayer(db, req.body);
    res.status(201).json(newPlayer);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// UPDATE A PLAYER'S RECORD
webapp.put('/player/:id', async (req, res) => {
  try {
    if (req.params.id === undefined) {
      res.status(404).json({ error: 'id is missing!' });
      return;
    }
    const newPlayerRecord = {
      ...req.body,
      id: req.params.id,
    };
    const updated = await updatePlayer(db, newPlayerRecord);
    res.status(200).json(updated);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// DELETE A PLAYER
webapp.delete('/player/:id', async (req, res) => {
  try {
    if (req.params.id === undefined) {
      res.status(404).json({ error: 'id is missing!' });
      return;
    }
    const deleted = await deletePlayer(db, req.params.id);
    res.status(200).json(deleted);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// GET n LEADERS
webapp.get('/leaders/:n', async (req, res) => {
  try {
    const leaders = await getLeaders(db, req.params.n);
    res.status(200).json(leaders);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Default response for any other request
webapp.use((_req, res) => {
  res.status(404).json({ error: 'no such route!' });
});

// Start server
const port = process.env.PORT || 5000;
webapp.listen(port, async () => {
  db = await connect(process.env.DATABASE);
  // eslint-disable-next-line no-console
  console.log(`Server running on port:${port}`);
});

webapp.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

module.exports = webapp;
