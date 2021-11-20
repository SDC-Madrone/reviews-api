var queryMethods = require('../database/queryMethods.js');

const models = {
  getReviews: function(queryParams) {
    // -- left off here, need to pass queryParams and desructure in selectReviews
    return queryMethods.selectReviews(queryParams);
  },

  getPhotos: function(reviewsToGetPhotosFor) {
    // input is an array
    var photoQueries = reviewsToGetPhotosFor.map(review => queryMethods.selectPhotos(review.id))
    console.log('should be an array of promises', photoQueries);
    return Promise.all(photoQueries);
    // should return a promise of an array of query results


  },

  getMeta: function(reqObject) {

  }

};

module.exports = models;



