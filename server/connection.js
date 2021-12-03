const mysql = require('mysql2');
require('dotenv').config();
// in docker, host MUST match the name provided for your db container in the docker-compose services
// " " " " make sure the specifed database is loaded on your container's instance

module.exports = mysql.createPool({
  // host: 'reviews_database', // (docker)
  

	host: '172.31.13.116',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'ratings_and_reviews',
  // flags: ['+LOCAL_FILES'],
  multipleStatements: true
}).promise();
