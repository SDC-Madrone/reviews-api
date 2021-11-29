const express = require('express');
const controllers = require('./controllers.js')
const app = express();
const PORT = 4000;

// define middleware
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.status(200).send('This endpoint won\'t serve anything useful. Please specify /reviews or /reviews/meta in your path');
})

app.get('/dockerTests', controllers.testDocker);

app.get('/reviews', controllers.handleGetReviews);

app.post('/reviews', controllers.handlePostReivews);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
