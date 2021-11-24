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

    models.getReviews(req.query)
    .then(([rows, fields]) => {
      var responseObject = transformers.reviews(rows, req.query);
      res.status(200).send(responseObject);
    })
    .catch((err) => {
      console.log('error querying for reviews', err);
      res.status(404).send(err);
    });
  },

  // GET /reviews/meta
  handleGetMeta: function(req, res) {
    models.getMeta(req.product_id)
    .then((rows) => {
      res.status(200).send(rows);
    })
    .catch((err) => {
      console.log('error getting metadata');
      res.status(400).send(err);
    });

  },

  // POST /reviews
  handlePostReivews: function(req, res) {
    // how do we handle bad data? The sql dbms SHOULD throw errors for trying to insert wrong values into fields
    // test this out in the shell first, then jest suites
    // NOTE - seems to handle it well :)

    models.postReviews(req.body)
      .then(() => {
        console.log('Added review to database')
        res.status(201).send('Added review!');
      })
      .catch((err) => {
        console.log('error logging reviews', err);
        res.status(400).send(err);
      })
  }
};

module.exports = controllers;
