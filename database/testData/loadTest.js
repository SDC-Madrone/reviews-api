const fs = require('fs');
const path = require('path');
const { parse } = require('../helpers.js');
const mysql = require('mysql2');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'reviews_test'
// })

// read the file
  // on success, write to the database

const testCSV = (filepath, queryString) => {
  fs.readFile(path.join(__dirname, 'characteristicsTest.csv'), 'utf8', (err, results) => {
    if (err) {
      console.log('error reading file');
      throw err;
    } else {
      var allRows = parse(results);
      // console.log('allRows: ', allRows);

      for (var i = 0; i < allRows.length; i++)
      connection.query(queryString, allRows[i], (err, results, fields) => {
        if (err) {
          console.log('error inserting into characteristics');
          throw err;
        }
      });
    }

  });

};

const generateQueryString = (tableName, row) => {
  // in: tablename (str), row (array)
  var placeHolderString;
  if (row.length === 1) {
    placeHolderString = '(?)';
  } else {
    var placeHolders = row.map((item, i, arr) => {
      if (i === 0) {
        return '(?, '
      } else if (i === row.length - 1) {
        return '?)'
      } else {
        return '?, '
      }
    });
    placeHolderString = placeHolders.join('');

  }

  console.log(placeHolderString);

  // get length of the row
  // generate (? ? ? ? ...) for number of elements in row

  // return a querystring with the variables inserted

};

generateQueryString('eelio', [2, 3]);
// testCSV('INSERT INTO characteristics VALUES (?, ?, ?);')