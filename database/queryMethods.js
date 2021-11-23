const connection = require('./connection.js');

const queryMethods = {
  // returns a promise

  selectReviewsAndPhotos: function({ page, count, sort, product_id }) {
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
  }

};

module.exports = queryMethods;
