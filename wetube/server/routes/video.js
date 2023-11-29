const express = require('express');
const connection = require('../connection');

const router = express.Router();

router.get('/:id', (req, res) => {
    let sql = `SELECT * FROM Video WHERE videoID="${req.params.id}";`;

    connection.query(sql, function(err, result) {
        if (err) {
            res.send(err)
            return;
        }
        res.json(result);
    });
});

module.exports = router;