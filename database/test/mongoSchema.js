const mongoose = require('mongoose');

// use the database 'ratings-and-reviews'
mongoose.connect('mongodb://localhost/ratings-and-reviews', {
  useNewUrlParser: true, useUnifiedTopology: true
});

// schema - using string where possible to minimize storage
var reviewSchema = mongoose.Schema({
  // k:v pairs to send in the response:
  product_id: String, // this one will go into an outer object
  _id: mongoose.ObjectId,
  rating: String,
  summary: String,
  recommend: Boolean,
  response: String,
  body: String,
  date: Date,
  reviewer_name: String,
  helpfulness: String,
  photos: [String],

  //k:v pairs NOT to send in the response:
  reported: Boolean,
  reviewer_email: String,
  not_helpfulness: String
});

var metaSchema1 = mongoose.Schema({
  product_id: String,
  ratings: {
    '1': String,
    '2': String,
    '3': String,
    '4': String,
    '5': String
  },
  recommended: {
    false: String,
    true: String
  }
  // Would having an ARRAY of characteristics_id's make anything faster/slower? (would have to reshape the data from arr->obj before res.send) either way, it's still an O(n) operation
});

// not putting this in metaSchema1 to allow for dynamic amt of characteristics
var metaCharacteristicSchema = mongoose.Schema({
  _id: mongoose.ObjectId,
  product_id: String,
  name: String,
  value: String
});


// A MODEL is a class to produce repo objects that are stored in the database,
  // you pass in the schema you created so that mongoDB knows HOW to store your data
// each instance of a MODEL is called a DOCUMENT
var Reviews = mongoose.model('Review', reviewSchema);
var MetaObjects = mongoose.model('MetaObject', metaSchema1);
var MetaCharacteristics = mongoose.model('MetaCharacteristic', metaCharacteristicSchema);


// questions on review:


  // will it slow down performance to .findAll() characteristics with product_id X?
    // if yes, is it safe to assume no more characteristics will be added to the current 6?
      // if yes, then probably better to give every document a slot for all 6...
      // in reviewSchema:
      //   characteristics: {
      //     Quality: {id: mongoose.ObjectId, value: String} // factor thes eown into their own schema, call `new Characteristic`
      //     Size: {id: mongoose.ObjectId, value: String}
      //     Fit: {id: mongoose.ObjectId, value: String}
      //     ...
      //   }

  // will using a number instead of string slow down performance due to higher storage?
    // or will storing as a Number require me to make values .toString() before sending a response (slower)?
