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
              debug("handling results from LDA API");
              let requery = `select "id", "href", title, author, date, "index"
                  from articles where "index" in
                  (?${",?".repeat(response.data.length - 1)})`;
              db.all(
                requery,
                response.data.map(entry => entry.index),
                (err, recs) => {
                  if (err) {
                    next(err);
                  } else {
                    res.send(response.data.map(entry => {
                      return {
                        ...entry,
                        ...recs.find(r => r.index === entry.index)
                      };
                    }));
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
