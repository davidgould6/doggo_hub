const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `
    SELECT "walk"."id", "walk"."time", "address"."street", "address"."city", "address"."state", "address"."zip", "pet"."name", "pet"."user_id"
    FROM "walk"
    JOIN "address"
    ON "walk"."address_id" = "address"."id"
    JOIN "pet"
    ON "walk"."pet_id" = "pet"."id"
    WHERE "pet"."user_id" = $1
    ORDER BY "walk"."id" ASC;`;
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

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  // console.log('this is req.params', req.params.id);
  const queryText = `
    DELETE FROM "walk" WHERE "id" = $1;`;
  pool.query(queryText, [req.params.id])
  .then(result =>{
    res.sendStatus(200);
  })
  .catch(error => {
    console.log('We have an error in /walk DELETE', error);
  });
});

router.put('/:id', rejectUnauthenticated, (req, res) => {
  console.log('this is req.params', req.params.id);
  console.log('this is req.body', req.body);
  const id = req.params.id;
  const date = req.body.date;
  const queryText =`UPDATE "walk" SET "time" = $1 WHERE "id" = $2;`
  pool.query(queryText, [date, id])
  .then(results =>{
    res.sendStatus(200);
  })
  .catch(error => {
    console.log('We have an error in /walk put', error);
    res.sendStatus(500);
  });
});

module.exports = router;