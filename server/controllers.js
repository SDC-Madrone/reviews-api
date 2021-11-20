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
    // var reviewsArray;
    // var photosArray;



    models.getReviewsAndPhotos(req.query)
    .then(([rows, fields]) => {
      // console.log('should be reviews:', rows);
      // reviewsArray = rows;
      // console.log(rows);

      var responseObject = transformers.reviews(rows, req.query);
      res.status(200).send(responseObject);


      // return models.getPhotos(rows);
    })
    // .then(([rows, fields]) => {
    //   photosArray = rows[0];
    //   console.log('should be photos: ', rows[0]);
    //   // var respondWith = transformers.reviews(reviewsArray, photosArray, req.query);
    //   res.status(200).send(rows);
    // })
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
