const express = require("express");
const router = express.Router();
const connection = require("../connection");

router.get("/bar", (req, res) => {
  let sql = `
    SELECT channel, SUM(videoView) AS totalViews
    FROM Video
    GROUP BY channel
    ORDER BY totalViews DESC
    LIMIT 5;
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
