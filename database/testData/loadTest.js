const fs = require('fs');
const path = require('path');
const { parse } = require('../helpers.js');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reviews_test'
})

// clean the data after loading
// UPDATE reviews
// SET response = null
// WHERE response = 'null';

// check out equivalent LOAD DATA statement if trouble:
// \copy characteristic_reviews(id, characteristic_id, review_id, value) FROM '/home/ubuntu/CSV/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;


// tableName: str
// row: array
const generateQueryString = (tableName, row) => {
  var placeHolders = row.map((item, i, arr) => {
    return '?';
  });
  var placeHolderString = placeHolders.join(', ');

  var queryString;

  if (tableName === 'reviews') {
    queryString = `INSERT INTO ${tableName} (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES (${placeHolderString});`;
  } else {
    queryString = `INSERT INTO ${tableName} VALUES (${placeHolderString});`
  }

  return queryString;
};



// testFile: str
// tableName: str
const testCSV = (localTestFile, tableName) => {
  fs.readFile(path.join(__dirname, localTestFile), 'utf8', (err, results) => {
    if (err) {
      console.log('error reading file');
      connection.end();
      throw err;
    } else {
      var allRows = parse(results);
      // console.log('allRows: ', allRows);
      var queryString;

      for (var i = 0; i < allRows.length; i++) {
        queryString = generateQueryString(tableName, allRows[i]);
        // console.log(queryString);
        connection.query(queryString, allRows[i], (err, results, fields) => {
          if (err) {
            console.log('error inserting into characteristics');
            connection.end();
            throw err;
          }
        });
      }
    }
  });
};
// connection pooling,
// .end() for terminal hanging



testCSV('reviewsTest.csv', 'reviews');

// testCSV('characteristic_reviewsTest.csv', 'characteristic_reviews');
// testCSV('characteristics.csv', 'characteristics');
// testCSV('reviews_photos.csv', 'photos');




'(id, product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email, response, helpfulness)'
