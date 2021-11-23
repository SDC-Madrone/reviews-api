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

    var sqlQuery = `BEGIN;
      INSERT INTO reviews (product_id, rating,
        summary, recommend,
        body, date,
        reviewer_name, reviewer_email)
        VALUES (?, ?, ?, ?, ?, ?, ?);
      SET @reviewID_to_use = LAST_INSERT_ID();
      INSERT INTO photos (review_id, url)
        VALUES (@reviewID_to_use, ?);
      INSERT INTO characteristic_reviews (characteristic_id, review_id, value)
        VALUES (?, @reviewID_to_use, ?);
      COMMIT;`;
    connection.promise().query(sqlQuery, []);
  }

};

module.exports = models;
