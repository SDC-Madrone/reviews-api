/*
  Run this file to load local CSV files into mySQL after loading schema.sql:
  Usage:
    1. `mysql -u <user> -p <password> < database/schema.sql`
    2. `node database/ETL.js`
*/

const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');
require('dotenv').config();
const baseDirectory = process.env.PATH_TO_CSVS;

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
    query = `LOAD DATA LOCAL INFILE ?
      INTO TABLE reviews
      FIELDS TERMINATED BY ','
      OPTIONALLY ENCLOSED BY '\"'
      LINES TERMINATED BY '\n'
      IGNORE 1 LINES
        (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness);`;
  } else {
    query = `LOAD DATA LOCAL INFILE ?
      INTO TABLE ${tableName}
      FIELDS TERMINATED BY ','
      OPTIONALLY ENCLOSED BY '\"'
      LINES TERMINATED BY '\n'
      IGNORE 1 LINES;`;
  }

  return connection.promise().query({
      sql: query,
      values: [pathToFile],
      infileStreamFactory: () => fs.createReadStream(pathToFile)
    });
};


const loadAll = () => {
  var intervalID = setInterval(()=> {
    console.log('loading...')
  }, 2500);

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
      clearInterval(intervalID);
      connection.end();
    })
    .catch((err) => {
      console.log('error loading csv files :(');
      clearInterval(intervalID);
      connection.end();
      console.error(err);
    });
};

loadAll();
