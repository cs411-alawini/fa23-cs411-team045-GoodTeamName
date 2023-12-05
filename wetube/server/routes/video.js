const express = require("express");
const connection = require("../connection");

const router = express.Router();

// to-do: get the video using the videoID
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

// to-do: search for videos using the search term(video title)
router.get("/search/:term", (req, res) => {
  let sql = `SELECT * FROM Video WHERE videoTitle LIKE "%${req.params.term}%"  ORDER BY videoLikes, videoView ASC LIMIT 20;`;

  connection.query(sql, function (err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.json(result);
    console.log(result);
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
