
const transformers = {
  reviews: function(reviewsArray, photosArray) {
    // put reviews and photos into one object to send back

    reviewsArray.forEach((reviewObject, i, arr) => {
      reviewObject.review_id = reviewObject.id;
      delete reviewObject.id;

      if (reviewObject.response === 'null') {
        reviewObject.response = null;
      }

      reviewObject.recommend = reviewObject.recommend === 'true' ? true : false;
    });

    var structured = {

    };

    // must be in this format:

    // {
    //   "product": "61576",
    //   "page": 0,
    //   "count": 5,
    //   "results": [
    //       {
    //           "review_id": 1055455, ///change from id
    //           "rating": 4,
    //           "summary": "I am liking these glasses",
    //           "recommend": true,
    //           "response": "Glad you're enjoying the product!",
    //           "body": "They are very dark. But that's good because I'm in very sunny spots",
    //           "date": "2019-06-23T00:00:00.000Z",
    //           "reviewer_name": "bigbrotherbenjamin",
    //           "helpfulness": 6,
    //           "photos": []
    //       },
    //       {
    //           "review_id": 1055456,
    //           "rating": 4,
    //           ...
    //       }
    // }
  },

  meta: function() {

  }

};

module.exports = transformers;
