var express = require('express');
var router = express.Router();
var debug = require('debug')('dochunt-api:router:hunt');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('the-ringer.db', sqlite3.OPEN_READONLY);

/* GET hunt results. */
router.get("/:target", function(req, res, next) {
  db.all("select id, href, title, author, date from articles where "
       + "title like $target or "
       + "subtitle like $target",
         { $target: '%' + req.params.target + '%' }, (err, rows) => {
           if (err) {
             next(err);
           } else {
             rows.forEach(row => {
               debug("row:", row);
             });
             // res.send(rows);
             res.render('index', { title: 'Hunt' });
           }
         });
});

module.exports = router;
