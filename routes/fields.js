const config = require("../config");
const express = require("express");
const passport = require("passport");
const router = express.Router();
const debug = require("debug")("dochunt-api:router:fields");


/* GET fields info */
router.get(
  "/",
  function(req, res) {
    debug("Sending fields");
    return res.send(config.fields);
});

module.exports = router;