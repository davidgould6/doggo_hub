const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `
    SELECT "pet"."id", "pet"."name", "pet"."user_id", "grooming"."time", "grooming"."drop_off_address"
    FROM "pet"
    JOIN "grooming"
    ON "pet"."id" = "grooming"."pet_id"
    WHERE "pet"."user_id" = $1;`;
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
    const petToGroomId = req.body.dogToGroom;
    console.log('these are our variables', petToGroomId, date);
    const queryText = `INSERT INTO "grooming" ("time", "pet_id")
    VALUES ($1, $2);`;

    pool.query(queryText, [date, petToGroomId])
    .then(result => {
        res.sendStatus(201);
    })
    .catch(error => {
        console.log('We have an error in walk.router POST', error);
    });
});

module.exports = router;