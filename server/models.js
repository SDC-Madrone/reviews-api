const connection = require('./connection.js');
const { groupCharacteristics, generatePlaceholders } = require('./helpers.js');

const models = {
  // returns a promise

  getReviews: function({ page, count, sort, product_id }) {
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
    LIMIT ?;`;

    return connection.promise().query(sqlQuery, [Number(product_id), Number(count)]);
  },

  postReviews: function(requestBody) {
    console.log('request body revied in models: ', requestBody);

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
      var photoQuery = `INSERT INTO photos (review_id, url) VALUES ${generatePlaceholders('photos', photos)}`;
    }

    var characteristicsQuery = ''
    var characteristicsArray = groupCharacteristics(characteristics);
    if (Object.keys(characteristics).length) {
      console.log('made it to parsing characteristics');

      characteristicsQuery = `INSERT INTO characteristic_reviews (characteristic_id, review_id, value) VALUES ${generatePlaceholders('characteristic_reviews', characteristics)}`;

        console.log('generated string: ', generatePlaceholders('characteristic_reviews', characteristics));
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


    var fullQuery =  `BEGIN;
    INSERT INTO reviews (product_id, rating, summary, recommend, body, date, reviewer_name, reviewer_email)
    VALUES (69, 2, 'omg I do not love this prod', false, 'asdfasdf', 1637713985008, 'ellio1994', 'asdfasdf@sdfsf.net');

    SET @reviewID_to_use = LAST_INSERT_ID();
    INSERT INTO photos (review_id, url)
    VALUES (@reviewID_to_use, 'sdafsdf'), (@reviewID_to_use, 'rtyerteyr');
    INSERT INTO characteristic_reviews (characteristic_id, review_id, value)
    VALUES ('2', @reviewID_to_use, 4), ('7', @reviewID_to_use, 2);
    COMMIT;`;

    // console.log('grouped values: ', groupedValues);

    var sqlQuery = `INSERT INTO reviews (product_id, rating, summary, recommend, body, date, reviewer_name, reviewer_email) VALUES (?, ?, ?, ?, ?, ?, ?, ?); SET @reviewID_to_use = LAST_INSERT_ID(); ${photoQuery}; ${characteristicsQuery};`;


    return connection.promise().query('START TRANSACTION')
      .then(() => {
        return connection.promise().query(sqlQuery, groupedValues);
      })
      .then(() => {
        return connection.promise().query('COMMIT');
      });
  }
};

module.exports = models;
