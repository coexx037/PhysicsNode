const mysql = require('mysql')

var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'Physics',
        multipleStatements: true
    })

module.exports = connection;