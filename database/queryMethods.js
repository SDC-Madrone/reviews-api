const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ratings_and_reviews',
});


const queryMethods = {
  // returns a promise
  retrive: function() {
    // should query the database for reviews specified
    return connection.promise().query('SELECT reviewer_name, reviewer_email FROM reviews WHERE id = 1;');

  },

  add: function() {

  }

};

module.exports = queryMethods;