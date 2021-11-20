var queryMethods = require('../database/queryMethods.js');

const models = {
  getReviewsAndPhotos: function(queryParams) {
    // -- left off here, need to pass queryParams and desructure in selectReviews
    return queryMethods.selectReviewsAndPhotos(queryParams);
  },

  getPhotos: function(reviewsToGetPhotosFor) {
    // input is an array
    // var photoQueries = reviewsToGetPhotosFor.map(review => queryMethods.selectPhotos(review.id))
    // console.log('should be an array of promises', photoQueries);
    // return Promise.all(photoQueries)
    //   .then((arrayOfResolved) => {
    //     console.log('resolved values: ', arrayOfResolved);
    //   })
    // console.log('reviewsToGetPhotosFor: ', reviewsToGetPhotosFor);


    // var promiseArray = [];
    // for (review of reviewsToGetPhotosFor) {
    //   promiseArray.push(queryMethods.selectPhotos(review.id));
    // }
    // return promiseArray;

    // should return a promise of an array of query results


  },

  getMeta: function(reqObject) {

  }

};

module.exports = models;



