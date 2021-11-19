const models = require('./models.js');

// handle requests
const controllers = {

  // GET /reviews
  handleGetReviews: function(req, res) {

    var reviewsArray;
    var photosArray;

    models.getReviews(req.query)
    .then(([reviewsRows, reviewsFields]) => {
      reviewsArray = reviewsRows
      return models.getPhotos(req.query)
    })
    .then(([photosRows, photosfields]) => {
      photosArray = photosRows;
      // models.ReviewsResponse(rows);

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
