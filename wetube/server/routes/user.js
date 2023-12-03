const express = require("express");
const connection = require("../connection");

const router = express.Router();

router.get("/:id", (req, res) => {
  let sql = `SELECT * FROM Users WHERE userID="${req.params.id}";`;

  connection.query(sql, function (err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.json(result);
  });
});

// to-do: add a route to create a user
router.post("/", (req, res) => {
  let sql = `INSERT INTO Users (username, password) VALUES ("${req.body.username}", "${req.body.password}");`;

  connection.query(sql, function (err, result) {
    if (err) {
      res.send(err);
      return;
    }
    res.json(result);
  });
});

module.exports = router;
