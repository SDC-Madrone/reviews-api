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
    var sqlQuery = 'SELECT id, product_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness FROM reviews WHERE product_id = ? LIMIT ?;';
    return connection.promise().query(sqlQuery, [Number(product_id), Number(count)]);
  },

  selectPhotos: function(reviewID) {
    var sqlQuery = 'SELECT id, url FROM photos WHERE review_id = ?';
    return connection.promise().query(sqlQuery, [reviewID]);
  }

};

module.exports = queryMethods;
