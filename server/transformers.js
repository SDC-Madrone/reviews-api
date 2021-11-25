
const transformers = {
  // assembles the response object
  // In: an array of query results and the req.params object
  reviews: function(reviewObjectsWithPhotos, reqQueryParams) {
    reviewObjectsWithPhotos.forEach((reviewObject, i, arr) => {
      if (reviewObject.response === 'null') {
        reviewObject.response = null;
      }

      reviewObject.recommend = reviewObject.recommend === 'true' ? true : false;
      if (!reviewObject.photos) {
        reviewObject.photos = [];
      }
    });

    return {
      product: reqQueryParams.product_id,
      page: Number(reqQueryParams.page),
      count: Number(reqQueryParams.count),
      results: reviewObjectsWithPhotos
    };
  },

  meta: function() {

  }

};

module.exports = transformers;
