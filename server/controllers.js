// handle requests

const controllers = {

  // GET /reviews
  handleGetReviews: function(req, res) {
    res.send('hello from getReivews');
    console.log('query parameters: ', req.query);
    models.getReviews(req.query)
  },

  // GET /reviews/meta
  handleGetMeta: function(req, res) {
    res.send('hello from getMeta');
  }



};

module.exports = controllers;
