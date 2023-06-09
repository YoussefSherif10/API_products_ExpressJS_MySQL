const mysql = require('mysql')
const dbConfig = require('../config/db.config')

let connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

connection.connect(err => {
    if (err)
        throw err;
    console.log('successfully connected to the database...');
})

module.exports = connection;