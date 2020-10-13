const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});


router.post('/', (req, res) => {
    console.log('This is our req.body in pet.router POST', req.body);
    console.log(req.user);
    const petName = req.body.petName;
    const petAge = req.body.age;
    const petSize = req.body.size;
    const userId = req.user.id;
    console.log('these are our variables', petName, petAge, petSize, userId);
    const queryText = `INSERT INTO "pet" ("name", "age", "size", "image_url", "user_id")
    VALUES ($1, $2, $3, 'https://i.imgur.com/JCKyAPl.png', $4);`

    pool.query(queryText, [petName, petAge, petSize, userId])
    .then(result => {
        res.sendStatus(201);
    })
    .catch(error => {
        console.log('We have an error in pet.router POST', error);
    });
});

module.exports = router;