var data = require('../data/locations');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.status(200).json({});
});

router.get('/api/locations', function(req, res) {
  res.status(200).json(data.locations);
});

module.exports = router;