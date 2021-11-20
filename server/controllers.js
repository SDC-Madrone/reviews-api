const models = require('./models.js');
const transformers = require('./transformers.js');

// handle requests
const controllers = {

  // GET /reviews
  handleGetReviews: function(req, res) {
    req.query.page = req.query.page || 0;
    req.query.count = req.query.count || 5;
    req.query.sort = req.query.sort || 'none';
    // req.query.product_id = queryParams.product_id;

    // these should be in the same order
    var reviewsArray;
    var photosArray;

    models.getReviews(req.query)
    .then(([reviewsRows, fields]) => {
      console.log('should be the reviews', reviewsRows);
      reviewsArray = reviewsRows
      return models.getPhotos(reviewsRows);
    })
    .then(([photosRows, fields]) => {
      photosArray = photosRows;
      console.log('photosRows: ', photosRows);
      var respondWith = transformers.reviews(reviewsArray, photosArray, req.query);

      res.status(200).send(respondWith);
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
