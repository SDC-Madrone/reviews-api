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


// tableName: str
// row: array
const generateQueryString = (tableName, row) => {
  var placeHolders = row.map((item, i, arr) => {
    return '?';
  });
  var placeHolderString = placeHolders.join(', ');

  return `INSERT INTO ${tableName} VALUES (${placeHolderString});`;
};


// testFile: str
// tableName: str
const testCSV = (localTestFile, tableName) => {
  fs.readFile(path.join(__dirname, localTestFile), 'utf8', (err, results) => {
    if (err) {
      console.log('error reading file');
      throw err;
    } else {
      var allRows = parse(results);
      // console.log('allRows: ', allRows);
      var queryString;
      for (var i = 0; i < allRows.length; i++) {
        queryString = generateQueryString(tableName, allRows[i])
        connection.query(queryString, allRows[i], (err, results, fields) => {
          if (err) {
            console.log('error inserting into characteristics');
            throw err;
          }
        });
      }
    }

  });

};


testCSV('characteristicsTest.csv', 'characteristics');
