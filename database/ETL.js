const fs = require('fs');
const path = require('path');
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


const testCSV = (localTestFile, tableName) => {
  // LOAD DATA using the file name
  var fileName = localTestFile.slice(2);
  var query;

  if (fileName === 'reviews') {
    query = "LOAD DATA LOCAL INFILE ? INTO TABLE reviews FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness);";
  } else {
    query = `LOAD DATA LOCAL INFILE ? INTO TABLE ${tableName} FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES;`;
  }

  connection.query(
    {
      sql: query,
      values: [localTestFile],
      infileStreamFactory: () => fs.createReadStream(path.join(__dirname, fileName))
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

// uncomment to test:
// testCSV('./reviewsTest.csv');
// testCSV('./characteristicsTest.csv', 'characteristics');
// testCSV('./characteristic_reviewsTest.csv', 'characteristic_reviews');
testCSV('./reviews_photosTest.csv', 'photos');
