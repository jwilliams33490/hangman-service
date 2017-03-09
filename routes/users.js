var express = require('express');
var gameData = require('../svc/gameData.js')
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource' + JSON.stringify(gameData));
  res.send('respond with a resource' + JSON.parse(gameData));
});

module.exports = router;
