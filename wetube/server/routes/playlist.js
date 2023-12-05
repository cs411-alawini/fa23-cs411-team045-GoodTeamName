const express = require("express");
const connection = require("../connection");

const router = express.Router();

// to-do: add a route to get all playlists
router.get("/", (req, res) => {
  // console.log(req.query);
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

// Return info for all videos contained in a playlist
router.get("/:id/v", (req, res) => {
  let sql = `SELECT v.videoID, v.videoTitle, v.channel, v.videoView
   FROM Contain c JOIN Video v ON (c.videoID = v.videoID)
   WHERE c.playListID = ${req.params.id};`;

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

// down below are routes need "req.body" to get data from front-end

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

// Also includes spaces (' ') and apostrophes
function isAlphaNumeric(str) {
  var code, i, len;
  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (!(code == 32) && // space (' ')
        !(code == 39) && // apostrophe
        !(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
}

// rename a playlist
router.put("/:id", (req, res) => {
  console.log(
    `Updating plalist ${req.params.id} with name "${req.body.playlistName}"`
  );
  if (!req.body.playlistName) {
    res.status(400).json({status: "Error", message: "No playlist name provided"});
  } else if (req.body.playlistName.length > 30) {
    res.status(400).json({status: "Error", message: "Playlist name must be 30 characters or less"})
  } else if (req.body.playlistName.length === 0) {
    res
      .status(400)
      .json({ status: "Error", message: "Playlist name cannot be empty" });
  } else if (!isAlphaNumeric(req.body.playlistName)) {
    res.status(400).json({
      status: "Error",
      message: "Please submit a valid (alphanumeric) playlist name",
    });
  } else {
    let sql = `UPDATE UserPlaylist
    SET playlistName = "${req.body.playlistName}"
    WHERE playlistID = ${req.params.id}`;

    connection.query(sql, function (err, result) {
      if (err) {
        res.send(err);
        return;
      }
      res.status(200).json(result);
    });
  }
});

// to-do: add a route to add a video to a playlist
router.post("/:id", (req, res) => {
  console.log(req.body);
  let sql = `INSERT INTO Contain (playlistID, videoID) VALUES ("${req.params.id}", "${req.body.videoID}");`;
  console.log(`Adding ("${req.params.id}", "${req.body.videoID}") to Contain`);
  connection.query(sql, function (err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.json(result);
  });
});

// to-do: add a route to remove a video from a playlist
router.delete("/:id/:videoID", (req, res) => {
  let sql = `DELETE FROM Contain WHERE playlistID="${req.params.id}" AND videoID="${req.params.videoID}";`;

  connection.query(sql, function (err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.json(result);
  });
});

module.exports = router;
