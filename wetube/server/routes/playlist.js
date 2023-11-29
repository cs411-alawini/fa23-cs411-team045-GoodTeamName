const express = require("express");
const connection = require("../connection");

const router = express.Router();

// to-do: add a route to get all playlists
router.get("/", (req, res) => {
  console.log(req.query);
  let sql = `SELECT * FROM UserPlaylist WHERE userID="${req.query.userID}";`;

  connection.query(sql, function (err, result) {
    if (err) {
      // console.log("error");
      res.send(err);
      return;
    }
    // console.log("sending");
    res.json(result);
  });
});

router.get("/:id", (req, res) => {
  let sql = `SELECT * FROM UserPlaylist WHERE playlistID="${req.params.id}";`;

  connection.query(sql, function (err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.json(result);
  });
});

// to-do: add a route to post a playlist to the database
router.post("/", (req, res) => {
  let sql = `INSERT INTO UserPlaylist (playlistName, userID) VALUES ("${req.body.playlistName}", "${req.body.userID}");`;

  connection.query(sql, function (err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.json(result);
  });
});

// to-do: add a route to remove a playlist from the database
router.delete("/:id", (req, res) => {
  let sql = `DELETE FROM UserPlaylist WHERE playlistID="${req.params.id}";`;

  connection.query(sql, function (err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.json(result);
  });
});

// to-do: add a route to add a video to a playlist
router.post("/:id", (req, res) => {
  let sql = `INSERT INTO Contain (playlistID, videoID) VALUES ("${req.params.id}", "${req.body.videoID}");`;

  connection.query(sql, function (err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.json(result);
  });
});

// to-do: add a route to remove a video from a playlist
router.delete("/:id", (req, res) => {
  let sql = `DELETE FROM Contain WHERE playlistID="${req.params.id}" AND videoID="${req.body.videoID}";`;

  connection.query(sql, function (err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.json(result);
  });
});

module.exports = router;
