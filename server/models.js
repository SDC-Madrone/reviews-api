var queryMethods = require('../database/queryMethods.js');

const models = {
  getReviews: function(queryParams) {
    console.log('got this hefty boi: ', queryParams);

    var page = queryParams.page || 0;
    var count = queryParams.count || 5;
    var sort = queryParams.sort || 'none';
    var product_id = queryParams.product_id;


    return queryMethods.retrive()

  },

  getMeta: function(reqObject) {

  }
};

module.exports = models;
