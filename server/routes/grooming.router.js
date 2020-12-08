const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  console.log('this is our req.params', req.params.id);
  const queryText = `
  DELETE FROM "grooming" WHERE "id" = $1 `;
  pool.query(queryText, [req.params.id])
  .then(result => {
    res.sendStatus(200);
  })
  .catch(error => {
    console.log('We have an error in grooming.router DELETE', error);
    res.sendStatus(500);
  });
});

router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `
    SELECT "grooming"."id", "grooming"."time", "grooming"."drop_off_address", "pet"."name", "pet"."user_id"
    FROM "grooming"
    JOIN "pet"
    ON "grooming"."pet_id" = "pet"."id"
    WHERE "pet"."user_id" = $1
    ORDER BY "grooming"."time" ASC`;
  pool.query(queryText, [req.user.id])
  .then(result => {
    res.send(result.rows);
  })
  .catch(error => {
    console.log('We have an error in grooming.router GET', error);
    res.sendStatus(500);
  });
});

router.post('/', rejectUnauthenticated, (req, res) => {
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
    console.log('We have an error in grooming.router POST', error);
    res.sendStatus(500);
  });
});

router.put('/:id', rejectUnauthenticated, (req, res) => {
  const id = req.params.id;
  const date = req.body.date;
  const queryText = `UPDATE "grooming" SET "time" = $1 WHERE "id" = $2;`;
  pool.query(queryText, [date, id])
  .then(result => {
    res.sendStatus(200);
  })
  .catch(error => {
    console.log('We have an error in grooming.router PUT', error);
    res.sendStatus(500);
  });
});

module.exports = router;