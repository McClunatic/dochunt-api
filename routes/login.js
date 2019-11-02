const express = require("express");
const passport = require("passport");
const router = express.Router();
const debug = require("debug")("dochunt-api:router:login");

/* POST user login */
router.post(
  "/",
  passport.authenticate('local', { session: false }),
  function(req, res) {
    let response = {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      message: `Logged in with user id ${req.user.id}`
    }
    debug(`response: ${response}`);
    res.send(response);
  }
 );

module.exports = router;
