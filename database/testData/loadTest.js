const fs = require('fs');
const path = require('path');
const { parse } = require('../helpers.js');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'loadTest'
})


var allRows;
fs.readFile(path.join(__dirname, 'characteristicsTest.csv'), 'utf8', (err, results) => {
  if (err) {
    console.log('error reading file');
    throw err;
  } else {
    allRows = parse(results);
    console.log('allRows: ', allRows);
  }

});
