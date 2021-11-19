const models = require('./models.js');

// handle requests
const controllers = {

  // GET /reviews
  handleGetReviews: function(req, res) {
    models.getReviews(req.query)// should return a promise
    .then(([rows, fields]) => {


      res.status(200).send(rows);
    })
    .catch((err) => {
      console.log('error querying for reviews');
      res.status(404).send('Not found :(');
      throw err;
    });


  },

  // GET /reviews/meta
  handleGetMeta: function(req, res) {
    res.send('hello from getMeta');
  }



};

module.exports = controllers;