var mysql = require('mysql');

var dbinfo = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'opentutorials'
});

module.exports = dbinfo;