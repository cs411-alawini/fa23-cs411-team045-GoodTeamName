const express = require("express");
const router = express.Router();
const connection = require("../connection");

router.get("/", (req, res) => {
  const sqlQuery = `
    SELECT videoCategory, SUM(videoView) AS totalViews
    FROM Video
    GROUP BY videoCategory
    ORDER BY totalViews DESC
    LIMIT 5;
  `;

  connection.query(sqlQuery, (err, results) => {
    if (err) {
      res.status(500).send("Error fetching data");
    } else {
      res.json(results);
    }
  });
});

module.exports = router;
