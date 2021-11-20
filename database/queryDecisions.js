// not a functioning file, just a journal of previous queries tried that may prove helpful in the future

// GET reviews:

// Option 1: query for reviews and then query for each set of photos (possibly faster than one query with a join)
selectReviews: function({ page, count, sort, product_id }) {
var sqlQuery = 'SELECT id, product_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, FROM reviews WHERE reviews.product_id = ? LIMIT ?;';
return connection.promise().query(sqlQuery, [Number(product_id), Number(count)]);
},

selectPhotos: function(reviewID) {
console.log('passed reviewID: ', reviewID);
var sqlQuery = 'SELECT id, url FROM photos WHERE review_id = ?;';
return connection.promise().query(sqlQuery, [reviewID]);
}