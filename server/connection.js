const mysql = require('mysql2/promise');

// in docker, host MUST match the name provided for your db container in the docker-compose services
// " " " " make sure the specifed database is loaded on your container's instance
module.exports = mysql.createPool({
  host: 'review_database',
  user: 'root',
  password: '',
  database: 'mysql',
  multipleStatements: true
});
