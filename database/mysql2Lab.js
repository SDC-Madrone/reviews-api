const connection = require('./connection.js');


var sqlQuery = `select reviews.id, JSON_ARRAYAGG(
  (SELECT CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT("id", id, "url", url)), ']') AS JSON)
  FROM photos WHERE review_id = reviews.id)
) AS results
FROM reviews
WHERE product_id = 4
GROUP BY reviews.id;`;



connection.query(sqlQuery, function(err, rows, fields) {
  console.log('result: ', rows[1].results);
  connection.end();
});
