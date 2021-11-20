const express = require('express');
const controllers = require('./controllers.js')
const PORT = 3000;
const app = express();

// define middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// routes
app.get('/', (req, res) => {
  res.status(200).send('Hello world! This endpoint wont\'t serve anything useful. Please specify /reviews or /reviews/meta in your path');
})

app.get('/reviews', controllers.handleGetReviews);

app.get('/reviews/meta', controllers.handleGetMeta);


module.exports = app;
