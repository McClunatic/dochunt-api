var express = require('express');
var router = express.Router();
var debug = require('debug')('dochunt-api:router:hunt');
var sqlite3 = require('sqlite3').verbose();
var path = require('path');
var dbpath = path.normalize('C:\\Users\\brian\\Workspace\\the-ringer-files\\the-ringer.db');
var db = new sqlite3.Database(dbpath, sqlite3.OPEN_READONLY);

/* GET hunt results. */
router.get("/", passport.authenticate("local"), function(req, res, next) {
  db.all("select id, href, title, author, date from articles where "
       + "title like $target or "
       + "subtitle like $target",
         { $target: '%' + req.query.target + '%' }, (err, rows) => {
           if (err) {
             next(err);
           } else {
             rows.forEach(row => {
               debug("row:", row);
             });
             res.send(rows);
           }
         });
});

module.exports = router;
