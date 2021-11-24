const pool = require('./connection.js');
const { groupCharacteristics, generatePlaceholders } = require('./helpers.js');

const models = {

  getReviews: function({ page, count, sort, product_id }) {
    var sortBy;
    switch (sort) {
      case "newest":
        sortBy = 'date';
        break;
      case "helpful":
        sortBy = 'helpfulness';
        break;
      case "relevant":
        sortBy = 'date'; // later balance by helpfulness
        break;
      default:
        sortBy = 'date'; // later balance by helpfulness
    }

    console.log('sortBy: ', sortBy);

    var sqlQuery = `
      SELECT reviews.id AS review_id,
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
    ORDER BY ${sortBy} DESC
    LIMIT ?;`;

    return pool.query(sqlQuery, [Number(product_id), Number(count)]);
  },

  postReviews: function(requestBody) {
    var {
      product_id,
      rating,
      summary,
      recommend,
      body,
      name,
      email,
      photos,
      characteristics
    } = requestBody;

    var photoQuery = '';
    if (photos.length) {
      var photoQuery = `INSERT INTO photos (review_id, url)
        VALUES ${generatePlaceholders('photos', photos)}`;
    }

    var characteristicsQuery = ''
    var characteristicsArray = groupCharacteristics(characteristics);
    if (Object.keys(characteristics).length) {
      characteristicsQuery = `INSERT INTO characteristic_reviews (characteristic_id, review_id, value)
        VALUES ${generatePlaceholders('characteristic_reviews', characteristics)}`;
    }

    var groupedValues = ([
      product_id,
      rating,
      summary,
      recommend,
      body,
      Date.now(),
      name,
      email,
      photos,
      characteristicsArray
    ]).flat();

    var sqlQuery = `
      START TRANSACTION;
      INSERT INTO reviews
      (product_id, rating,
        summary, recommend,
        body, date,
        reviewer_name,
        reviewer_email)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?);
      SET @reviewID_to_use = LAST_INSERT_ID();
      ${photoQuery};
      ${characteristicsQuery};
      COMMIT;`;

    return pool.query(sqlQuery, groupedValues);
  }
};

module.exports = models;
