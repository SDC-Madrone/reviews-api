const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');
const baseDirectory = '/Users/elliotlichtenberg/Desktop/'
const connectionOptions = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ratings_and_reviews',
  flags: ['+LOCAL_FILES']
};


const loadCSV = (fileName, tableName) => {

  var connection = mysql.createConnection(connectionOptions);
  var pathToFile = path.join(baseDirectory, fileName);
  var query;
  if (fileName === 'reviews.csv') {
    query = "LOAD DATA LOCAL INFILE ? INTO TABLE reviews FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness);";
  } else {
    query = `LOAD DATA LOCAL INFILE ? INTO TABLE ${tableName} FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES;`;
  }

  connection.query({
      sql: query,
      values: [pathToFile],
      infileStreamFactory: () => fs.createReadStream(pathToFile)
    },
    (err, results, meta) => {
      if (err) {
        console.log(`Error loading data into table "${tableName}" from ${fileName}`);
        connection.end();
        throw err;
      } else {
        // success
        console.log(`LOADED ${fileName}!`);
        connection.end();
      }
    }
  );
};

const initiateLoad = (csvFile, table) => {
  loadCSV(csvFile, table);
};

// manually typed out the filenames and ran this module for each one, later may refactor to do all at once
// may need to open a connection pool for 4 processes to run at once? Look into this
initiateLoad(/*  */);

// successfully loaded Nov 18th:
  // 'reviews.csv', 'reviews'
  // 'characteristics.csv', 'characteristics'
  // 'characteristic_reviews.csv', 'characteristic_reviews'
  // 'photos.csv', 'photos'


// TODO:
// clean the data after loading, eg.
// UPDATE reviews
// SET response = null
// WHERE response = 'null';

// check out connection pooling for when multiple servers need to access/query you database,
