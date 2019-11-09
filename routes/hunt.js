var config = require('../config');
var express = require('express');
var router = express.Router();
const passport = require("passport");
var debug = require('debug')('dochunt-api:router:hunt');
var sqlite3 = require('sqlite3').verbose();
var path = require('path');
var dbpath = path.normalize(config.dbpath);
var db = new sqlite3.Database(dbpath, sqlite3.OPEN_READONLY);

/* GET hunt results. */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  function(req, res, next) {
    debug("hunting");
    let columns = config.columns
      .filter(col => col !== "content")
    let query = `
      select ${columns.map(str => `"${str}"`).join(', ')}
      from articles where title like $target or subtitle like $target`;
    debug("query:", query);
    db.all(
      query,
      { $target: '%' + req.query.target + '%' },
      (err, rows) => {
        if (err) {
          next(err);
        } else {
          rows.forEach(row => {
            debug("row:", row);
          });
          res.send(rows);
        }
      }
    );
});

module.exports = router;
