const express = require('express');
const connection = require('../connection');

const router = express.Router();

router.get('/:id', (req, res) => {
    console.log("LOGGING");
    console.log(connection);
    let sql = `SELECT * FROM Video WHERE videoID="${req.params.id}";`;

    connection.query(sql, function(err, result) {
        if (err) {
            res.send(err)
            return;
        }
        console.log(result);
        // res.redirect('/success');
        res.json(result);
    });
});

module.exports = router;