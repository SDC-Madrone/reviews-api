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

// read the file
  // on success, write to the database


fs.readFile(path.join(__dirname, 'characteristicsTest.csv'), 'utf8', (err, results) => {
  if (err) {
    console.log('error reading file');
    throw err;
  } else {
    var allRows = parse(results);
    // console.log('allRows: ', allRows);

    for (var i = 0; i < allRows.length; i++)
    connection.query('INSERT INTO characteristics VALUES (?, ?, ?);', allRows[i], (err, results, fields) => {
      if (err) {
        console.log('error inserting into characteristics');
        throw err;
      }
    });
  }

});
