const mysql = require('mysql2');

// in docker, host MUST match the name provided for your db container in the docker-compose services
// " " " " make sure the specifed database is loaded on your container's instance
module.exports = mysql.createPool({
  // host: 'reviews_database', // (docker)
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ratings_and_reviews',
  // flags: ['+LOCAL_FILES'],
  multipleStatements: true
}).promise();
