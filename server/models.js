const connection = require('./connection.js');

const models = {
  // returns a promise

  getReviews: function({ page, count, sort, product_id }) {
    var sqlQuery = `SELECT reviews.id AS review_id,
                      rating, summary,
                      recommend, response,
                      body, date,
                      reviewer_name, helpfulness,
                      (SELECT CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT("id", id, "url", url)), ']') AS JSON)
                        FROM photos
                        WHERE review_id = reviews.id
                      )
                      AS photos
    FROM reviews
    WHERE product_id = ?
    LIMIT ?;`;

    return connection.promise().query(sqlQuery, [Number(product_id), Number(count)]);
  },

  postReviews: function(requestBody) {
    console.log('request body revied in models: ', requestBody);
    // -- LEFT OFF HERE --
    // -- look at mysql transactions and procedures, may be useful for this one
    var sqlQuery = 'INSERT INTO reviews ...'
    connection.promise().query(sqlQuery, []);
  }

};

module.exports = models;
