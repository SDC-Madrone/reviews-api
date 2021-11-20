var queryMethods = require('../database/queryMethods.js');

const models = {
  getReviews: function(queryParams) {
    var page = queryParams.page || 0;
    var count = queryParams.count || 5;
    var sort = queryParams.sort || 'none';
    var product_id = queryParams.product_id;

    return queryMethods.selectReviews(page, count, sort, product_id);
  },

  getPhotos: function(reviewsRows) {
    var reviewIDs = reviewsRows.map(row => row.id);
    return queryMethods.selectPhotos(reviewIDs);
  },

  getMeta: function(reqObject) {

  }

};

module.exports = models;
