
const transformers = {
  // assembles the response object
  // In: an array of query results and the req.params object
  reviews: function(reviewObjectsWithPhotos, { page, count, product_id }) {
    page = Number(page);
    count = Number(count);
    var totalCount = reviewObjectsWithPhotos.length;
    var startIndex = page * count;
    // if page over-specified
    if (startIndex >= totalCount) {
      reviewObjectsWithPhotos = [];
    } else {
      // otherwise get the starting index for page specified
      var stopIndex;
      if (startIndex + count > totalCount) {
        stopIndex = totalCount;
      } else {
        stopIndex = startIndex + count;
      }

      var reviewObject;
      var results = [];
      for (var i = startIndex; i < stopIndex; i++) {
        reviewObject = reviewObjectsWithPhotos[i];
        if (reviewObject.response === 'null') {
          reviewObject.response = null;
        }

        reviewObject.recommend = reviewObject.recommend === 'true' ? true : false;
        if (!reviewObject.photos) {
          reviewObject.photos = [];
        }

        results.push(reviewObject);
      }
    }

    return {
      product: product_id,
      page: page,
      count: count,
      results: results
    };
  },

};

module.exports = transformers;
