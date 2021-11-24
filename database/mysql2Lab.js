const connection = require('./connection.js');

var sqlQuery =

connection.query(sqlQuery, function(err, rows, fields) {
  console.log('result of query: ', rows);


  connection.end();
});
