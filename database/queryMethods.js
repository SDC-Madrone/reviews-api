const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ratings_and_reviews',
});


const queryMethods = {
  // returns a promise
  selectReviews: function(page, count, sort, product_id) {
    // should query the database for reviews specified
    var sqlQuery = 'SELECT * FROM reviews WHERE product_id = ? LIMIT ?;'
    console.log('product_id: ', product_id);
    console.log('count', count);
    return connection.promise().query(sqlQuery, [Number(product_id), Number(count)]);

  },

  add: function() {

  }

};

module.exports = queryMethods;