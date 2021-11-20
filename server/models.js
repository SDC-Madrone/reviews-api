var queryMethods = require('../database/queryMethods.js');

const models = {
  getReviews: function(queryParams) {
    // -- left off here, need to pass queryParams and desructure in selectReviews
    return queryMethods.selectReviews(page, count, sort, product_id);
  },

  getPhotos: function(reviewsToGetPhotosFor) {
    // input is an array
    var photoQueries = reviewsToGetPhotosFor.map(review => queryMethods.selectPhotos(review.id))
    return Promise.all(photoQueries);

    // should return a promise of an array of query results
  },

  getMeta: function(reqObject) {

  }

};

module.exports = models;
