const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const debug = require("debug")("dochunt-api:router:login");
const db = require("../db")
const userDb = new db.UserDb("/home/ec2-user/environment/dochunt-api/users.db");

/* POST user login */
router.post("/register", function(req, res) {
  userDb.insert([
      req.body.name,
      req.body.email,
      bcrypt.hashSync(req.body.password, 8)
    ],
    function(err) {
      if (err) { return res.status(500).send("Unable to register user"); }
      userDb.selectByEmail(req.body.email, function(err, user) {
        if (err) { return res.status(500).send("Unable to confirm new user"); }
        req.login(user, function(err) {
          if (err) { return res.status(500).send("Unable to log user in"); }
          return res.send(`Registered user logged in with user id ${user.id}`);
        });
      });
    }
  );
});

module.exports = router;
