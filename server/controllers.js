const models = require('./models.js');

// handle requests
const controllers = {

  // GET /reviews
  handleGetReviews: function(req, res) {
    models.getReviews(req.query)// should return a promise
    .then((resultsOfQuery) => {
      res.status(200).send(resultsOfQuery);
    })
    .catch((err) => {
      res.status(404).send('Not found :(');
    });


  },

  // GET /reviews/meta
  handleGetMeta: function(req, res) {
    res.send('hello from getMeta');
  }



};

module.exports = controllers;
