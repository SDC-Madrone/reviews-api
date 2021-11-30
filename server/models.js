const pool = require('./connection.js');
const { groupCharacteristics, generatePlaceholders } = require('./helpers.js');

const models = {

  getReviews: function({ page, count, sort, product_id }) {

    var sortBy;
    switch (sort) {
      case "newest":
        sortBy = 'ORDER BY date DESC';
        break;
      case "helpful":
        sortBy = 'ORDER BY helpfulness DESC';
        break;
      case "relevant":
        sortBy = 'ORDER BY date DESC'; // later balance by helpfulness
        break;
      default:
        sortBy = '';
    }

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
    ${sortBy};`;

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
        VALUES ${generatePlaceholders('photos', photos)};`;
    }

    var characteristicsQuery = ''
    var characteristicsArray = groupCharacteristics(characteristics);
    if (Object.keys(characteristics).length) {
      characteristicsQuery = `INSERT INTO characteristic_reviews (characteristic_id, review_id, value)
        VALUES ${generatePlaceholders('characteristic_reviews', characteristics)};`;
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
      ${photoQuery}
      ${characteristicsQuery}
      COMMIT;`;

    return pool.query(sqlQuery, groupedValues);
  },

  testRequest: function() {
    var sqlQuery = `SELECT * FROM genera;`;
    return pool.query(sqlQuery);
  }
};

module.exports = models;


// total results: 70
// page: 0
// count: 5 (means 5 per page)
// page 0 would be first 5
// page 1 would be next 5
// and so on

