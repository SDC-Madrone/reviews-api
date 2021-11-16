const mongoose = require('mongoose');

// use the database 'ratings-and-reviews'
mongoose.connect('mongodb://localhost/ratings-and-reviews', {
  useNewUrlParser: true, useUnifiedTopology: true
});

// schema
var reviewSchema = mongoose.Schema({

});

var userSchema = mongoose.Schema({

});

var userProductReviewsJoinSchema = mongoose.Schema({

});

// A MODEL is a class to produce repo objects that are stored in the database,
  // you pass in the schema you created so that mongoDB knows HOW to store your data
// each instance of a MODEL is called a DOCUMENT

//
var Reviews = mongoose.model('Review', reviewSchema);
var Users = mongoose.model('User', userSchema);
var ProductUserReviews = mongoose.model('ProductUserReview', userProductReviewsJoinSchema);