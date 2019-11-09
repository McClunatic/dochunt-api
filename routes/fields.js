const express = require("express");
const passport = require("passport");
const router = express.Router();
const debug = require("debug")("dochunt-api:router:fields");


/* GET fields info */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  function(req, res) {
    debug("Sending fields");
    return res.send([
      {
        col: 0,
        key: "id",
        label: "Number",
        sortable: true,
        thStyle: "width: 17%"
      },
      {
        col: 1,
        key: "title",
        label: "Title",
        sortable: true,
        thStyle: "width: 50%"
      },
      {
        col: 2,
        key: "author",
        label: "Author",
        sortable: true,
        thStyle: "width: 17%"
      },
      {
        col: 3,
        key: "date",
        label: "Date",
        sortable: true,
        thStyle: "width: 16%"
      }
    ]);
});

module.exports = router;