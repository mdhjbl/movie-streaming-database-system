require('dotenv').config();
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME,
    multipleStatements: true
});

const sql = fs.readFileSync(path.join(__dirname, 'database', 'seed.sql'), 'utf8');

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to database');
    
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing seed:', err);
            connection.end();
            return;
        }
        console.log('Seeding complete');
        connection.end();
    });
});
