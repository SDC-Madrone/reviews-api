const mysql = require('mysql2/promise');

module.exports = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ratings_and_reviews',
  multipleStatements: true
});
