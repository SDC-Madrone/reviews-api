const fs = require('fs');
const path = require('path');
const { parse, generateQueryString } = require('../helpers.js');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reviews_test',
  flags: ['+LOCAL_FILES']
});

// TODO:
// clean the data after loading, eg.
// UPDATE reviews
// SET response = null
// WHERE response = 'null';

// check out equivalent LOAD DATA statement if trouble:
// \copy characteristic_reviews(id, characteristic_id, review_id, value) FROM '/home/ubuntu/CSV/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;



// connection pooling,





var query = "LOAD DATA LOCAL INFILE './reviews_photosTest.csv' INTO TABLE photos FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n';"


const testCSV = (localTestFile, tableName) => {
  // LOAD DATA using the file name
  connection.query(
    {
      sql: query,
      values: [],
      infileStreamFactory: () => fs.createReadStream(path.join(__dirname, 'reviews_photosTest.csv'))
    },
    (err, results, meta) => {
      if (err) {
        console.log('error loading data');
        connection.end();
        throw err;
      } else {
        console.log('LOADED! CHECK SHELL');
        connection.end();
      }
    }
  );

};


testCSV();

// testCSV('characteristic_reviewsTest.csv', 'characteristic_reviews');
// testCSV('characteristics.csv', 'characteristics');
// testCSV('reviews_photos.csv', 'photos');




// '(id, product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email, response, helpfulness)'
