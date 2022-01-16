const express = require('express');
const controllers = require('./controllers.js')
const app = express();
const PORT = 4000;
require('dotenv').config();

app.use(express.json());
app.get('/', (req, res) => {
  res.status(200).send('Invalid endpoint. Please specify /reviews in your path');
});
app.get('/reviews', controllers.handleGetReviews);
app.post('/reviews', controllers.handlePostReivews);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

