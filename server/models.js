var queryMethods = require('../database/queryMethods.js');

const models = {
  getReviewsAndPhotos: function(queryParams) {
    // -- left off here, need to pass queryParams and desructure in selectReviews
    return queryMethods.selectReviewsAndPhotos(queryParams);
  },

  getMeta: function(reqObject) {

  },

  postReviewsAndPhotos: function(reqBody) {

  }

};

module.exports = models;



