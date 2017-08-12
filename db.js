const mysql = require('mysql')

var pool = mysql.createPool({
        host: 'xxx',
        user: 'xxx',
        password: 'xxx',
        database: 'xxx',
        multipleStatements: true
    })



module.exports = pool;
