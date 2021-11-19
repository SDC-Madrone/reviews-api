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

const connection = mysql.createConnection(connectionOptions);

const loadCSV = (fileName, tableName) => {

  var pathToFile = path.join(baseDirectory, fileName);
  var query;
  if (fileName === 'reviews.csv') {
    query = "LOAD DATA LOCAL INFILE ? INTO TABLE reviews FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 LINES (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness);";
  } else {
    query = `LOAD DATA LOCAL INFILE ? INTO TABLE ${tableName} FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 LINES;`;
  }

  return connection.promise().query({
      sql: query,
      values: [pathToFile],
      infileStreamFactory: () => fs.createReadStream(pathToFile)
    });
};


const loadAll = () => {
  loadCSV('reviews.csv', 'reviews')
    .then(() => {
      console.log(`LOADED REVIEWS`);
      return loadCSV('characteristics.csv', 'characteristics');
    })
    .then(() => {
      console.log(`LOADED CHARACTERISTICS`);
      return loadCSV('characteristic_reviews.csv', 'characteristic_reviews');
    })
    .then(() => {
      console.log('LOADED CHARACTERISTIC_REVIEWS');
      return loadCSV('photos.csv', 'photos');
    })
    .then(() => {
      console.log('LOADED PHOTOS');
      connection.end();
    })
    .catch((err) => {
      console.log('error loading csv files');
      connection.end();
      throw err;
    });
};


// may be better to open a connection pool for 4 processes to run at once? Look into this
loadAll();


// TODO:
// if you need to clean any data:
// UPDATE reviews
// SET response = null
// WHERE response = 'null';

// check out connection pooling for when multiple servers need to access/query you database,
