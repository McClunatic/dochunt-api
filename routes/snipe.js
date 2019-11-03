const config = require("../config");
var express = require('express');
var router = express.Router();
const passport = require("passport");
const axios = require("axios");
const querystring = require("querystring");
var debug = require('debug')('dochunt-api:router:snipe');
var sqlite3 = require('sqlite3').verbose();
var path = require('path');
var dbpath = path.normalize('C:\\Users\\brian\\Workspace\\the-ringer-files\\the-ringer.db');
var db = new sqlite3.Database(dbpath, sqlite3.OPEN_READONLY);

/* GET snipe results. */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  function(req, res, next) {
    debug("sniping");
    db.get(
      'select "index" from articles where id = $target',
      { $target: req.query.target },
      (err, row) => {
        if (err) {
          next(err);
        } else {
          let query = {
            target: row.index,
            num_best: req.query.num_best
          };
          axios
            .get(`${config.lda_api}/snipe`, { params: query })
            .then(response => {
              var records = [];
              response.data.forEach(entry => {
                debug("handling results from LDA API");
                db.get(
                  'select "id", "href", title, author, date ' +
                  'from articles where "index" = ?',
                  [entry.index],
                  (err, rec) => {
                    if (err) {
                      next(err);
                    } else {
                      records.push({ similarity: entry.similarity, ...rec });
                    }
                  }
                );
              });
              // refactor to use promise-based sqlite library
              var check = setInterval(() => {
                if (records.length === response.data.length) {
                  clearInterval(check);
                  res.send(records.sort((a, b) => b.similarity - a.similarity));
                }
              });
            })
            .catch(err => {
              next(err);
            });
        }
      }
    );
});

module.exports = router;
