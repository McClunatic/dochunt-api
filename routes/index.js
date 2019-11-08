var express = require('express');
var router = express.Router();
const debug = require("debug")("dochunt-api:router:index");

/* GET home page. */
router.get('/', function(req, res, next) {
  debug("Rendering index");
  res.render('index', { title: 'Express' });
});

module.exports = router;
