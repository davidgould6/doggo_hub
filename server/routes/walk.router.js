const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
  // console.log('this is req.user in pet get', req.user);
  const queryText = `
  SELECT * FROM "pet" WHERE "user_id" = $1;`;
  pool.query(queryText, [req.user.id])
  .then(result => {
    res.send(result.rows);
  })
  .catch(error => {
    console.log('We have an error in pets GET', error);
    res.sendStatus(500);
  });
});


router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('This is our req.body in walk.router POST', req.body);
    const date = req.body.date;
    const petToWalkId = req.body.dogToWalk;
    const addressId = req.body.address;
    console.log('these are our variables', petToWalkId, date, addressId);
    
    const queryText = `INSERT INTO "walk" ("time", "pet_id", "address_id")
    VALUES ($1, $2, $3);`

    pool.query(queryText, [date, petToWalkId, addressId])
    .then(result => {
        res.sendStatus(201);
    })
    .catch(error => {
        console.log('We have an error in walk.router POST', error);
    });
});

module.exports = router;