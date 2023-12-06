const express = require("express");
const connection = require("../connection");

const router = express.Router();

// Get friends list for a user
router.get("/:userId/friends", (req, res) => {
  let sql = `
    SELECT u.userId, u.username
    FROM Users AS u
    INNER JOIN Friend AS f ON u.userId = f.userIDb
    WHERE f.userIDa = ${req.params.userId};
  `;

  connection.query(sql, function (err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.json(result);
  });
});



router.get("/:userId/recommendations", (req, res) => {
  let sameInterestSql = `
  SELECT otherUsers.userId, otherUsers.username, GROUP_CONCAT(DISTINCT commonCategories.videoCategory) AS videoCategories
  FROM (
      SELECT u.userId, u.username, v.videoCategory
      FROM Users u
      JOIN UserPlaylist up ON u.userId = up.userId
      JOIN Contain con ON up.playlistID = con.playListID
      JOIN Video v ON con.videoID = v.videoID
      WHERE u.userId <> ${req.params.userId}
  ) AS otherUsers
  JOIN (
      SELECT v.videoCategory
      FROM UserPlaylist up
      JOIN Contain con ON up.playlistID = con.playListID
      JOIN Video v ON con.videoID = v.videoID
      WHERE up.userId = ${req.params.userId}
  ) AS commonCategories ON otherUsers.videoCategory = commonCategories.videoCategory
  LEFT JOIN Friend f ON (otherUsers.userId = f.userIDa AND ${req.params.userId} = f.userIDb) OR (otherUsers.userId = f.userIDb AND ${req.params.userId} = f.userIDa)
  WHERE f.userIDa IS NULL AND f.userIDb IS NULL
  GROUP BY otherUsers.userId, otherUsers.username
  ORDER BY RAND()
  
  

  
  
  `;

  connection.query(sameInterestSql, [req.params.userId, req.params.userId], function (err, sameInterestResult) {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred while processing your request.');
      return;
    }

    let friendOfFriendSql = `
      SELECT U.userId, U.username, f1.userIDa AS 'friendOfId', u1.username AS 'friendOfName'
      FROM Users AS U
      JOIN Friend AS f1 ON U.userId = f1.userIDb
      JOIN Users AS u1 ON f1.userIDa = u1.userId
      WHERE f1.userIDa IN (
        SELECT f2.userIDb
        FROM Friend AS f2
        WHERE f2.userIDa = ?
      ) AND U.userId NOT IN (
        SELECT f3.userIDb
        FROM Friend AS f3
        WHERE f3.userIDa = ?
      ) AND U.userId != ?
      LIMIT 2;
    `;

    connection.query(friendOfFriendSql, [req.params.userId, req.params.userId, req.params.userId], function (err, friendOfFriendResult) {
      if (err) {
        console.error(err);
        res.status(500).send('An error occurred while processing your request.');
        return;
      }

      res.json({
        sameInterest: sameInterestResult,
        friendOfFriend: friendOfFriendResult
      });
    });
  });
});



// Add a friend to the user's friends list
router.post("/:userId/friends", (req, res) => {
  let sql = `
    INSERT INTO Friend (userIDa, userIDb)
    VALUES (${req.params.userId}, ${req.body.friendId});
  `;

  connection.query(sql, function (err, result) {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(result);
  });
});

// Remove a friend from the user's friends list
router.delete("/:userId/friends/:friendId", (req, res) => {
  let sql = `
    DELETE FROM Friend
    WHERE userIDa = ${req.params.userId} AND userIDb = ${req.params.friendId};
  `;

  connection.query(sql, function (err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.json(result);
  });
});

module.exports = router;

