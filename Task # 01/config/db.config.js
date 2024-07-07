const mysql = require('mysql2');

const db = mysql.createConnection({
    // user: 'root',
    // host: 'localhost',
    // password: 'Admin-123',
    // database: 'test',

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = db;
