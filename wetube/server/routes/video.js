const express = require("express");
const connection = require("../connection");

const router = express.Router();

router.get("/:id", (req, res) => {
  let sql = `SELECT * FROM Video WHERE videoID="${req.params.id}";`;

  connection.query(sql, function (err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.json(result);
  });
});

// Get all the playlist ID's that this video belongs to
router.get("/:id/p", (req, res) => {
  let sql = `SELECT playListID FROM Contain WHERE videoID="${req.params.id}";`;

  connection.query(sql, function (err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.json(result);
  });
});

module.exports = router;
