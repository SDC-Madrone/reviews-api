var queryMethods = require('../database/queryMethods.js');

const models = {
  getReviews: function(queryParams) {
    var page = queryParams.page || 0;
    var count = queryParams.count || 5;
    var sort = queryParams.sort || 'none';
    var product_id = queryParams.product_id;

    queryMethods.selectReviews(page, count, sort, product_id)
      .then((rows, fields, meta) => {
        // we have all the reviews, now need to get photos for each

      }
  },

  // getPhotos: function(reviewsRows) {
  //   var reviewIDs = reviewsRows.map(row => row.id);
  //   return queryMethods.selectPhotos(reviewIDs);
  // },

  getMeta: function(reqObject) {

  }

};

module.exports = models;
