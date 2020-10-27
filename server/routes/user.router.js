const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

router.get('/address', rejectUnauthenticated, (req, res) => {
  const userId = req.user.id;

  const queryText = `
    SELECT * FROM "address"
    WHERE "user_id" = $1;`;
  
  pool.query(queryText, [userId])
  .then(result => {
    res.send(result.rows);
  })
  .catch(error => {
    console.log('We have an error in /api/user/address GET', error);
  });
})

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  // console.log(req.body);
  // console.log(req.user);
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  // Creating a query string to enter user information into user table and returning id.
  // First Query for user table.
  const queryText = `INSERT INTO "user" (username, password, first_name, last_name)
    VALUES ($1, $2, $3, $4) RETURNING *;`;
  pool.query(queryText, [username, password, firstName, lastName])
  // Then for first query
  .then((result) => {
    // console.log('Is this our id??', result.rows[0].id);
    const userId = result.rows[0].id;
    const user = result.rows[0];
    const street = req.body.street;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;

    // Second query for address table. 
    let queryText = `INSERT INTO "address" ("street", "city", "state", "zip", "user_id")
      VALUES ($1, $2, $3, $4, $5)`
    pool.query(queryText, [street, city, state, zip, userId])
      // Then for second query
      .then(result => {
        console.log('this is user', user);
        res.status(201).send(user);
      })
      // Catch for second query
      .catch(error => {
        console.log('We have an error in query for address table', error);
        res.sendStatus(500);
      });
    })
    // Catch for first query. 
    .catch(() => res.sendStatus(500));
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
