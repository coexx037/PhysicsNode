const mysql = require('mysql')

var connection = mysql.createConnection({
        host: 'us-cdbr-iron-east-03.cleardb.net',
        user: 'b73e052c103438',
        password: 'f18555ce',
        database: 'heroku_4f4874e0596111c',
        multipleStatements: true
    })

module.exports = connection;

//mysql://b73e052c103438:f18555ce@us-cdbr-iron-east-03.cleardb.net/heroku_4f4874e0596111c?reconnect=true