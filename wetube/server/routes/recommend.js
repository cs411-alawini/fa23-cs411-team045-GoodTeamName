const express = require("express");
const router = express.Router();
const connection = require("../connection");

router.get("/:userId", (req, res) => {
  const userId = req.params.userId; // Ensure userId is sanitized or validated as needed

  // Call the stored procedure
  const sql = "CALL RecommendSingleVideo(?)";
  connection.query(sql, [userId], (err, results, fields) => {
    if (err) {
      console.error("Error executing the recommendation procedure", err);
      res.status(500).send("Error executing the recommendation procedure");
      return;
    }

    // The stored procedure might return multiple result sets. You will need to handle them accordingly.
    // For simplicity, we're assuming it returns one result set which is at index 0.
    res.json(results[0]);
  });
});

module.exports = router;
