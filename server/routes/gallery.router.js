const express = require('express');
const router = express.Router();
const galleryItems = require('../modules/gallery.data');

// GET Route
router.get('/', (req, res) => {
  res.send(galleryItems);
}); // END GET Route

module.exports = router;