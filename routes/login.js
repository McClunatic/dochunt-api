const express = require("express");
const passport = require("passport");
const router = express.Router();
const debug = require("debug")("dochunt-api:router:login");


/* POST user login */
router.post("/", function(req, res, next) {
  passport.authenticate("local", function(err, user, info, status) {
    if (err) { return next(err); }
    if (!user) { return res.status(status).send([user, info]); }
    req.login(user, function(err) {
      if (err) { return next(err); }
      debug(`Logging in user ${user.username}`);
      return res.send({
        user: user.username,
        message: `Logged in with user id ${user.id}`
      });
    });
  })(req, res, next);
});

module.exports = router;
