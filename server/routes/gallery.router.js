const express = require('express');
const router = express.Router();
const galleryItems = require('../modules/gallery.data');

router.get('/', (req, res) => {
  res.send(galleryItems);
});

module.exports = router;