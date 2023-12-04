const express = require("express");
const connection = require("../connection");
const bcrypt = require("bcrypt");

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

// to-do: add a route to login a user
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    let sql = `SELECT * FROM Users WHERE username="${username}";`;
    connection.query(sql, function (err, result) {
      if (err) {
        res.send(err);
        return;
      }
      const user = result[0];
      console.log(result);

      if (!user) {
        return res.status(401).json({ error: "Invalid username " });
      }

      // Compare the provided password with the hashed password
      const passwordMatch = bcrypt.compare(password, user.userPassword);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid  password" });
      }

      // Check if req.session is defined before setting properties
      if (!req.session) {
        return res.status(500).json({ error: "Session not available" });
      }

      // Authentication successful
      const userToSend = {
        id: user.userID,
        username: user.userName,
        // Add other fields as needed
      };

      // Store user information in session storage
      req.session.user = userToSend;

      res.json({ message: "Login successful", user: userToSend });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
