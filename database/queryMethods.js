const connection = require('./connection.js');

const queryMethods = {
  // returns a promise

  selectReviewsAndPhotos: function({ page, count, sort, product_id }) {
    var sqlQuery = 'SELECT reviews.id AS review_id, product_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, photos.id AS id, url FROM reviews INNER JOIN photos ON reviews.id = photos.review_id WHERE reviews.product_id = ? LIMIT ?;';
    return connection.promise().query(sqlQuery, [Number(product_id), Number(count)]);
  }

};

module.exports = queryMethods;
