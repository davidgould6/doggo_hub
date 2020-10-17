const express = require('express');
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.delete('/:id', rejectUnauthenticated, (req, res) => {
  console.log('This is our req.params.id in /pet DELETE', req.params.id);
  const petId = req.params.id
  const queryText = `DELETE FROM "pet" WHERE "id" = $1;`;
  pool.query(queryText, [petId])
  .then(result => {
    res.sendStatus(200);
  })
  .catch(error => {
    console.log('We have an error in pet.router DELETE', error);
    res.sendStatus(500);
  });
});

router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('this is req.user in pet get', req.user);
  const queryText = `
  SELECT * FROM "pet" WHERE "user_id" = $1 ORDER BY "id" ASC;`;
  pool.query(queryText, [req.user.id])
  .then(result => {
    res.send(result.rows);
  })
  .catch(error => {
    console.log('We have an error in pet.router GET', error);
    res.sendStatus(500);
  });
});

router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('This is our req.body in pet.router POST', req.body);
  console.log(req.user);
  const petName = req.body.petName;
  const petAge = req.body.age;
  const petSize = req.body.size;
  const image_url = req.body.image_url
  const addressId = req.body.dogAddress
  const userId = req.user.id;
  console.log('these are our variables', petName, petAge, petSize, image_url, userId);
  const queryText = `INSERT INTO "pet" ("name", "age", "size", "image_url", "user_id", "address_id")
  VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;`;

  pool.query(queryText, [petName, petAge, petSize, image_url, userId, addressId])
  .then(result => {
    console.log(result.rows[0].id);
    res.sendStatus(201);
  })
  .catch(error => {
      console.log('We have an error in pet.router POST', error);
      res.sendStatus(500);
  });
});

router.put('/:id', rejectUnauthenticated, (req, res) => {
  console.log('This is our req.body in pet.router PUT', req.body);
  console.log('This is our req.params.id in /pet PUT', req.params.id);
  const petName = req.body.petName;
  const petAge = req.body.age;
  const petSize = req.body.size;
  const petId = req.params.id;
  const queryText = `
    UPDATE "pet" 
    SET 
    "name" = $1,
    "age" = $2,
    "size" = $3
    WHERE "id" = $4;`;
  pool.query(queryText, [petName, petAge, petSize, petId])
  .then(result => {
    res.sendStatus(200);
  })
  .catch(error => {
    console.log('We have an error in pet.router PUT', error);
    res.sendStatus(500);
  });
});

module.exports = router;