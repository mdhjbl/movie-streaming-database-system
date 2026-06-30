require('dotenv').config();
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '',
  multipleStatements: true
});

async function setup() {
  try {
    await new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    console.log('✅ Connected to MySQL server');

    // Drop and recreate database
    await new Promise((resolve, reject) => {
      connection.query(`DROP DATABASE IF EXISTS \`${process.env.DB_NAME}\``, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    await new Promise((resolve, reject) => {
      connection.query(`CREATE DATABASE \`${process.env.DB_NAME}\``, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    console.log('✅ Database created');

    // Use the database
    await new Promise((resolve, reject) => {
      connection.query(`USE \`${process.env.DB_NAME}\``, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Apply schema
    const schemaSql = fs.readFileSync(path.join(__dirname, 'database', 'schema.sql'), 'utf8');
    await new Promise((resolve, reject) => {
      connection.query(schemaSql, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    console.log('✅ Schema applied');

    // Apply seed data (this includes all users, movies, series, comments, favorites, watchlist, seasons, episodes)
    const seedSql = fs.readFileSync(path.join(__dirname, 'database', 'seed.sql'), 'utf8');
    await new Promise((resolve, reject) => {
      connection.query(seedSql, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    console.log('✅ Seed data applied (NO cast/actor data included!)');
    connection.end();
  } catch (err) {
    console.error('❌ Error:', err);
    connection.end();
  }
}

setup();
