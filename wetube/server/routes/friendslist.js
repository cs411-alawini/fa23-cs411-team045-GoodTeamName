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

// // Get friend recommendations for a user
// router.get("/:userId/recommendations", (req, res) => {
//   let sql = `
//     SELECT u.userId, u.username
//     FROM Users AS u
//     WHERE u.userId NOT IN (
//       SELECT f.userIDb
//       FROM Friend AS f
//       WHERE f.userIDa = ?
//     ) AND u.userId != ?
//     LIMIT 3;
//   `;

//   connection.query(sql, [req.params.userId, req.params.userId], function (err, result) {
//     if (err) {
//       console.error(err);
//       res.status(500).send('An error occurred while processing your request.');
//       return;
//     }
//     res.json(result);
//   });
// });


router.get("/:userId/recommendations", (req, res) => {
  let userRegionSql = `
    SELECT userRegion FROM Users WHERE userId = ?;
  `;

  connection.query(userRegionSql, [req.params.userId], function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send('An error occurred while processing your request.');
      return;
    }

    let userRegion = result[0].userRegion;

    let sameRegionSql = `
      SELECT u.userId, u.username, u.userRegion
      FROM Users AS u
      WHERE u.userId NOT IN (
        SELECT f.userIDb
        FROM Friend AS f
        WHERE f.userIDa = ?
      ) AND u.userId != ? AND u.userRegion = ?
      LIMIT 2;
    `;

    let friendOfFriendSql = `
    SELECT u.userId, u.username, f1.userIDa as 'friendOfId', u1.username as 'friendOfName'
    FROM Users AS u
    JOIN Friend AS f1 ON u.userId = f1.userIDb
    JOIN Users AS u1 ON f1.userIDa = u1.userId
    WHERE f1.userIDa IN (
      SELECT f2.userIDb
      FROM Friend AS f2
      WHERE f2.userIDa = ?
    ) AND u.userId NOT IN (
      SELECT f3.userIDb
      FROM Friend AS f3
      WHERE f3.userIDa = ?
    ) AND u.userId != ?
    LIMIT 3;
  `;

    connection.query(sameRegionSql, [req.params.userId, req.params.userId, userRegion], function (err, sameRegionResult) {
      if (err) {
        console.error(err);
        res.status(500).send('An error occurred while processing your request.');
        return;
      }

      connection.query(friendOfFriendSql, [req.params.userId, req.params.userId, req.params.userId], function (err, friendOfFriendResult) {
        if (err) {
          console.error(err);
          res.status(500).send('An error occurred while processing your request.');
          return;
        }

        res.json({
          sameRegion: sameRegionResult,
          friendOfFriend: friendOfFriendResult
        });
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
      res.send(err);
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

