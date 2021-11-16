const mongoose = require('mongoose');

// use the database 'ratings-and-reviews'
mongoose.connect('mongodb://localhost/ratings-and-reviews', {
  useNewUrlParser: true, useUnifiedTopology: true
});

// schema
var reviewSchema = mongoose.Schema({
  _id: mongoose.ObjectId,
  product_id: Number,
  user_id: Number,
  helpful_count: Number,
  not_helpful_count: Number,
  created_at: Date,

  rating: Number,
  recommended: Boolean,
  characteristics: [Number]

  title_summary: String,
  body: String,
  photos: [String]

});

var userSchema = mongoose.Schema({
  _id: mongoose.ObjectId,
  name: String,
  email: String
});

var characteristicSchema = mongoose.Schema({
  _id: mongoose.ObjectId,
  name: String,
  value: Number
});


// A MODEL is a class to produce repo objects that are stored in the database,
  // you pass in the schema you created so that mongoDB knows HOW to store your data
// each instance of a MODEL is called a DOCUMENT
var Reviews = mongoose.model('Review', reviewSchema);
var Users = mongoose.model('User', userSchema);
var Characteristics = mongoose.model('Characteristic', characteristicSchema);
