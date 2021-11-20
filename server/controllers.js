const models = require('./models.js');
const transformers = require('./transformers.js');

// handle requests
const controllers = {

  // GET /reviews
  handleGetReviews: function(req, res) {

    var reviewsArray;
    var photosArray;

    models.getReviews(req.query)
    .then(([reviewsRows, reviewsFields]) => {
      reviewsArray = reviewsRows
      return models.getPhotos(reviewsRows);
    })
    .then(([photosRows, photosfields]) => {
      photosArray = photosRows;
      var respondWith = transformers.reviews(reviewsArray, photosArray);

      res.status(200).send(reviewsArray);

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
