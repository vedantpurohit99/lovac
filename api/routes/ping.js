var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Welcome to the backend of Lovac.');
});

module.exports = router;