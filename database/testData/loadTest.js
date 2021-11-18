const fs = require('fs');
const path = require('path');
const { parse, generateQueryString } = require('../helpers.js');
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



// testFile: str
// tableName: str
const depricatedTestCSV = (localTestFile, tableName) => {
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


const testCSV = (localTestFile, tableName) => {
  // LOAD DATA using the file name
  connection.query('LOAD DATA LOCAL INFILE INTO TABLE photos "./reviews_photosTest.csv" FIELDS TERMINATED BY "," LINES TERMINATED BY "\n";', (err, results, meta) => {
    if (err) {
      console.log('error loading data');
      throw err;
    }

    console.log('LOADED! CHECK SHELL');
  })
    // on success,
      // console.log(done)
      // close the connection
};


testCSV('reviewsTest.csv', 'reviews');

// testCSV('characteristic_reviewsTest.csv', 'characteristic_reviews');
// testCSV('characteristics.csv', 'characteristics');
// testCSV('reviews_photos.csv', 'photos');




'(id, product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email, response, helpfulness)'
