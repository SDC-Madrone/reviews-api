const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ratings_and_reviews',
});


const queryMethods = {
  // returns a promise
  selectReviews: function({ page, count, sort, product_id }) {

    // should query the database for reviews specified


    // -- LEFT OFF HERE, try joining tables to get this in one query, save current operation in case joining is even slower
    // -- also look into the ARRAYAGG mysql function

    var sqlQuery = 'SELECT reviews.id, product_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, photos.id, url FROM reviews INNER JOIN photos ON reviews.id = photos.review_id WHERE reviews.product_id = ? LIMIT ?;';
    return connection.promise().query(sqlQuery, [Number(product_id), Number(count)]);
  },

  selectPhotos: function(reviewID) {
    console.log('passed reviewID: ', reviewID);
    var sqlQuery = 'SELECT id, url FROM photos WHERE review_id = ?;';
    return connection.promise().query(sqlQuery, [reviewID]);
  }

};

module.exports = queryMethods;
