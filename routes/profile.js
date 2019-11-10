const config = require("../config");
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const debug = require("debug")("dochunt-api:router:profile");
const db = require("../db")
const userDb = new db.UserDb("C:\\Users\\brian\\Workspace\\dochunt-api\\users.db");

/* POST user profile tags update */
router.post(
  "/",
  passport.authenticate('jwt', { session: false }),
  function(req, res) {
    debug(`Updating tags in profile from body ${req.body}`);
    debug("Inserts:", req.body.insert);
    debug("Deletes:", req.body.delete);
    if (req.body.delete.length > 0) {
      userDb.deleteTags(
        req.user.id,
        req.body.delete,
        function(err) {
          if (err) {
            return res.status(500).send("Unable to remove tags from profile");
          }
        }
      );
    }
    if (req.body.insert.length > 0) {
      userDb.insertTags(
        req.user.id,
        req.body.insert,
        function(err) {
          if (err) {
            return res.status(500).send("Unable to insert tags in profile");
          }
        }
      );
    }
    let response = {
      message: `Updated tags for user id ${req.user.id}`
    };
    debug(`response: ${response}`);
    res.send(response);
  }
 );

/* GET user profile tags */
 router.get(
   "/",
  passport.authenticate('jwt', { session: false }),
  function(req, res, next) {
    debug(`Getting tags for profile from body ${req.body}`);
    userDb.selectTags(req.user.id, function(err, rows) {
      if (err) { next(err); }
      else {
        rows.forEach(row => {
          debug("tag row:", row);
        });
        res.send(rows);
      }
    });
  }
 );

module.exports = router;
