const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
})




connection.connect((error) => {
    if(error) throw error;
})

module.exports = connection;



