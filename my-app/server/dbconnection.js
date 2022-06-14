const mysql = require('mysql');
const connection = mysql.createPool({
    host: '10.10.104.14.133',
    port: 3306,
    user: 'root',
    password: 'root123',
    database: 'maria_db'
})

module.exports = connection;