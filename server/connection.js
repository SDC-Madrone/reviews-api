const mysql = require('mysql2');
require('dotenv').config();

module.exports = mysql.createPool({
  host: process.env.DB_IP_ADDRESS,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true
}).promise();
