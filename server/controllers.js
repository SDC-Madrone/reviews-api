const models = require('./models.js');
const transformers = require('./transformers.js');
const { isValidRequest } = require('./validateRequest.js');
// handle requests
const controllers = {

  // GET /reviews
  handleGetReviews: function(req, res) {
    if (req.query.product_id === undefined) {
      console.log(`GET | res 400`);
      res.status(400).send('Bad request: Need query parameter "product_id"');
      return;
    }

    req.query.page = req.query.page || 0;
    req.query.count = req.query.count || 5;
    req.query.sort = req.query.sort || 'none';

    models.getReviews(req.query)
    .then(([rows, fields]) => {
      var responseObject = transformers.reviews(rows, req.query);
      console.log(`GET | product_id: ${req.query.product_id} | res 200`);
      res.status(200).send(responseObject);
    })
    .catch((err) => {
      console.log(`GET | product_id: ${req.query.product_id} | res 404`);
      console.log('error querying for reviews', err);
      res.status(404).send(err);
    });
  },

  // POST /reviews
  handlePostReivews: function(req, res) {
    // how do we handle bad data? The sql dbms SHOULD throw errors for trying to insert wrong values into fields
    // test this out in the shell first, then jest suites
    // NOTE - seems to handle it well :)
    if (!isValidRequest(req.body)) {
      console.log('POST | res 400');
      res.status(400).send('Bad request');
      return;
    }

    models.postReviews(req.body)
      .then(() => {
        console.log('POST | res 201 (added to database)');
        res.status(201).send('Added review!');
      })
      .catch((err) => {
        console.log('POST | res 400');
        console.log('error logging reviews', err);
        res.status(400).send(err);
      })
  }
};

module.exports = controllers;
