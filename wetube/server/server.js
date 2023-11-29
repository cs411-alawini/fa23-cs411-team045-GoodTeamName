const express = require('express');
const cors = require("cors");
var mysql = require('mysql2');
var connection = mysql.createConnection({
    host: '34.42.208.118',
    user: 'root',
    password: 'wetube',
    database: 'wetube_database'
});

const app = express();

app.use(cors());
app.use(express.json());

app.get('/video/:id', (req, res) => {
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

app.listen(8080, () => {
    console.log(`Server is running on port 8080.`);
});