const express = require("express");
const router = express.Router();
const connection = require("../connection");

router.get("/pie", (req, res) => {
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
      // Calculate the total views of the top 5 categories
      const totalViews = results.reduce(
        (acc, curr) => acc + curr.totalViews,
        0
      );

      // Normalize the data so that the sum equals 100%
      const normalizedResults = results.map((category) => ({
        ...category,
        totalViews: (category.totalViews / totalViews) * 100,
      }));

      res.json(normalizedResults);
    }
  });
});
module.exports = router;
