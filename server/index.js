const express = require('express');
const controllers = require('./controllers.js')
const app = express();
const PORT = 4000;
require('dotenv').config();

// define middleware
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.status(200).send('This endpoint won\'t serve anything useful. Please specify /reviews or /reviews/meta in your path');
})


app.get('/' + process.env.LOADER_IO_KEY, (req, res) => {
  res.status(200).send(LOADER_IO_KEY);
});

app.get('/payloadGET', controllers.payloadForGet);
app.get('/payloadPOST', controllers.payloadForPost);

app.get('/reviews', controllers.handleGetReviews);

app.post('/reviews', controllers.handlePostReivews);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
