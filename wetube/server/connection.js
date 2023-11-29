var mysql = require('mysql2');
var connection = mysql.createConnection({
    host: '34.42.208.118',
    user: 'root',
    password: 'wetube',
    database: 'wetube_database'
});

module.exports = connection;