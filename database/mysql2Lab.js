const connection = require('./connection.js');


var sqlQuery = `select reviews.id AS review_id, product_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness,
(SELECT CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT("id", id, "url", url)), ']') AS JSON)
FROM photos WHERE review_id = reviews.id)
AS photos
FROM reviews
WHERE product_id = 4;`;



connection.query(sqlQuery, function(err, rows, fields) {
  console.log(rows);
  connection.end();
});
