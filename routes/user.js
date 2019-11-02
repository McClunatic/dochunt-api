const express = require("express");
const passport = require("passport");
const router = express.Router();
const debug = require("debug")("dochunt-api:router:user");


/* GET user info */
router.get("/", passport.authenticate("local"), function(req, res) {
  return res.send({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email
  });
});

module.exports = router;
