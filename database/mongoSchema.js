const mongoose = require('mongoose');

// use the database 'ratings-and-reviews'
mongoose.connect('mongodb://localhost/ratings-and-reviews', {
  useNewUrlParser: true, useUnifiedTopology: true
});

// schema
var reviewSchema = mongoose.Schema({
  // k:v pairs to send in the response:
  product_id: Number, // this one will go into an outer object
  _id: mongoose.ObjectId,
  rating: Number,
  summary: String,
  recommend: Boolean,
  response: String,
  body: String,
  date: Date,
  reviewer_name: String,
  helpfulness: Number,
  photos: [String],

  //k:v pairs NOT to send in the response:
  reported: Boolean,
  reviewer_email: String,
  not_helpfulness: Number
});

var metaSchema = mongoose.Schema({
  product_id: Number,
  ratings: {},
  recommended: {},
  characteristics: {}
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
var MetaObjects = mongoose.model('MetaObject', metaSchema);
var Characteristics = mongoose.model('Characteristic', characteristicSchema);