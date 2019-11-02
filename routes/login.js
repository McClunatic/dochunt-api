const config = require("../config");
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const debug = require("debug")("dochunt-api:router:login");

/* POST user login */
router.post(
  "/",
  passport.authenticate('local', { session: false }),
  function(req, res) {
    let token = jwt.sign(
      { id: req.user.id },
      config.secret,
      { expiresIn: 86400 }
    );
    let response = {
      token: token,
      user: {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email
      },
      message: `Logged in with user id ${req.user.id}`
    };
    debug(`response: ${response}`);
    res.send(response);
  }
 );

module.exports = router;
