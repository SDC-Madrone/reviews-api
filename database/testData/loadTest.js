const fs = require('fs');
const path = require('path');
// const { parse, generateQueryString } = require('../helpers.js');
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

// check out connection pooling for when multiple servers need to access/query you database,


const testCSV = (localTestFile) => {
  // LOAD DATA using the file name

  var query = "LOAD DATA LOCAL INFILE ? INTO TABLE reviews FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness);";
  connection.query(
    {
      sql: query,
      values: [localTestFile],
      infileStreamFactory: () => fs.createReadStream(path.join(__dirname, localTestFile.slice(2)))
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

testCSV('./reviewsTest.csv');

// testCSV('./characteristics.csv');
// testCSV('characteristic_reviewsTest.csv');
// testCSV('reviews_photos.csv');

//TESTED AND DONE:



// '(id, product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email, response, helpfulness)'
