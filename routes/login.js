const express = require("express");
const passport = require("passport");
const router = express.Router();
const debug = require("debug")("dochunt-api:router:login");


/* POST user login */
router.post("/login", function(req, res, next) {
  passport.authenticate("local", function(err, user, info, status) {
    if (err) { return next(err); }
    if (!user) { return res.status(status).send([user, info]); }
    req.login(user, function(err) {
      if (err) { return next(err); }
      return res.send(`Logged in with user id ${user.id}`);
    });
  });
});

module.exports = router;
