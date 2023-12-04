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

// Get friend recommendations for a user
router.get("/:userId/recommendations", (req, res) => {
  let sql = `
    SELECT u.userId, u.username
    FROM Users AS u
    WHERE u.userId NOT IN (
      SELECT f.userIDb
      FROM Friend AS f
      WHERE f.userIDa = ${req.params.userId}
    ) AND u.userId != ${req.params.userId}
    LIMIT 3;
  `;

  connection.query(sql, function (err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.json(result);
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

