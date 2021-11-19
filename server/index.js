const express = require('express');
const controllers = require('./controllers.js')
const PORT = 3000;
const app = express();

// define middleware
// define routes (app.use them as middleware?)

app.get('/', (req, res) => {
  res.status(200).send('Hello world! This endpoint wont\'t serve anything useful. Please specify /reviews or /reviews/meta in your path');
})

app.get('/reviews', controllers.handleGetReviews);

app.get('/reviews/meta', controllers.handleGetMeta);


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});