const models = require('./models.js');
const transformers = require('./transformers.js');
// handle requests
const controllers = {

  // GET /reviews
  handleGetReviews: function(req, res) {
    if (req.query.product_id === undefined) {
      res.status(400).send('Bad request: Need query parameter "product_id"');
    }

    req.query.page = req.query.page || 0;
    req.query.count = req.query.count || 5;
    req.query.sort = req.query.sort || 'none';

    models.getReviewsAndPhotos(req.query)
    .then(([rows, fields]) => {
      var responseObject = transformers.reviews(rows, req.query);
      res.status(200).send(responseObject);
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
  },

  // POST /reviews
  handlePostReivews: function(req, res) {
    res.send('hello from post reviews');
    // how do we handle bad data? The sql dbms SHOULD throw errors for trying to insert wrong values into fields
    // test this out in the shell first
  }

};

module.exports = controllers;
