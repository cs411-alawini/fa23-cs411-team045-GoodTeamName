const express = require("express");
const connection = require("../connection");

const router = express.Router();

// get top 2 playlistIDs for a user
router.get("/", (req, res) => {
  // console.log(req.query);
  let sql = `SELECT playlistID FROM UserPlaylist WHERE userID="${req.query.userID}" LIMIT 2;`;

  connection.query(sql, function (err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.json(result);
  });
});

//get the first videoID from a playlist
router.get("/:id", (req, res) => {
  let sql = `SELECT * FROM Contain WHERE playlistID="${req.params.id}" LIMIT 1;`;

  connection.query(sql, function (err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.json(result);
  });
});

router.get("/:id/countLists", (req, res) => {
  let sql = `SELECT COUNT(*) AS playlistCount FROM UserPlaylist WHERE userID="${req.params.id}";`;

  connection.query(sql, function (err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.json(result);
  });
});

router.get("/:id/countVideos", (req, res) => {
  let sql = `
    SELECT COUNT(*) AS videoCount
    FROM Contain c
    JOIN UserPlaylist up ON c.playListID = up.playlistID
    WHERE up.userID = "${req.params.id}";
  `;

  connection.query(sql, function (err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.json(result);
  });
});

router.get("/:id/countRegionVideos", (req, res) => {
  // Step 1: Get the user's region
  let userId = req.params.id;
  let getRegionSql = `SELECT userRegion FROM Users WHERE userID = ?;`;

  connection.query(getRegionSql, [userId], function (err, regionResult) {
    if (err) {
      res.status(500).send(err);
      return;
    }

    if (regionResult.length === 0) {
      res.status(404).send("User not found");
      return;
    }

    // Step 2: Construct the dynamic SQL query
    let region = regionResult[0].userRegion;
    let countVideosSql = `SELECT COUNT(*) AS videoCount FROM ??;`;

    // Step 3: Execute the query
    connection.query(countVideosSql, [region], function (err, countResult) {
      if (err) {
        res.status(500).send(err);
        return;
      }
      res.json(countResult[0]);
    });
  });
});

module.exports = router;
