const express = require("express");
const router = express.Router();
const connection = require("../connection");

router.get("/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    try {
      // Call the stored procedure
      const [results] = await connection.query("CALL RecommendVideos(?)", [
        userId,
      ]);
      // For simplicity, we're assuming it returns one result set which is at index 0.
      res.json(results[0]);
    } finally {
      // Release the connection back to the pool
      connection.release();
    }
  } catch (error) {
    console.error("Error calling the recommendation procedure: ", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
