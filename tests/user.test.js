// Setup test db.
process.env.TEST = true;

// supertest
const supertest = require('supertest');
const app = require('../server/server');
const agent = supertest.agent(app);

// pool
const pool = require('../server/modules/pool');

