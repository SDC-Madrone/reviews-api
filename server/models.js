const models = {
  getReviews: function(queryParams) {
    console.log('got this hefty boi: ', queryParams);

    var page = queryParams.page || 0;
    var count = queryParams.count || 5;
    var sort = queryParams.sort || 'none';
    var product_id = queryParams.product_id;

    var handleGoodRequest = (result) => {
      return result;
    }

    // 'You send a very valid request oWo';
    // new Error('Missing product id - GET/reviews requires the product_id query parameter');


    var handleBadRequest = (err) => {
      return err;
    }

    return new Promise((resolve, reject) => {

    })


  },

  getMeta: function(reqObject) {

  }
};

module.exports = models;
